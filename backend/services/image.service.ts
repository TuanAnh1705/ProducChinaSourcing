import { JWT } from 'google-auth-library';

let cachedToken: string | null = null;
let tokenExpiry = 0;

export class ImageService {
    private async getAccessToken(): Promise<string> {
        if (cachedToken && Date.now() < tokenExpiry) return cachedToken;

        const auth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        });

        const token = await auth.getAccessToken();
        if (!token.token) throw new Error('Failed to get access token');

        cachedToken = token.token;
        tokenExpiry = Date.now() + 55 * 60 * 1000;
        return cachedToken;
    }

    private async fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
        for (let i = 0; i < retries; i++) {
            const res = await fetch(url, options);
            if (res.status !== 429) return res;
            const retryAfter = parseInt(res.headers.get('Retry-After') ?? '2', 10);
            await new Promise(r => setTimeout(r, retryAfter * 1000 * (i + 1)));
        }
        return fetch(url, options);
    }

    async fetchImage(id: string): Promise<{ buffer: ArrayBuffer; contentType: string } | null> {
        try {
            const accessToken = await this.getAccessToken();
            const res = await this.fetchWithRetry(
                `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            if (res.ok) {
                return {
                    buffer: await res.arrayBuffer(),
                    contentType: res.headers.get('content-type') ?? 'image/jpeg',
                };
            }
        } catch { /* fallback */ }

        try {
            const res = await this.fetchWithRetry(
                `https://drive.google.com/thumbnail?id=${id}&sz=w2000`,
                { redirect: 'follow' }
            );
            if (res.ok) {
                return {
                    buffer: await res.arrayBuffer(),
                    contentType: res.headers.get('content-type') ?? 'image/jpeg',
                };
            }
        } catch { /* not found */ }

        return null;
    }
}
