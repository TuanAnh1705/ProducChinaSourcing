import { NextRequest, NextResponse } from 'next/server';
import { ImageService } from '../services/image.service';

export class ImageController {
    private service = new ImageService();

    async handleGet(req: NextRequest): Promise<NextResponse> {
        const id = new URL(req.url).searchParams.get('id');

        if (!id || !/^[\w-]+$/.test(id)) {
            return new NextResponse('Invalid image ID', { status: 400 });
        }

        const image = await this.service.fetchImage(id);

        if (!image) {
            return new NextResponse('Image not found', { status: 404 });
        }

        return new NextResponse(image.buffer, {
            status: 200,
            headers: {
                'Content-Type': image.contentType,
                'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
            },
        });
    }
}
