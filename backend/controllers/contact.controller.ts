/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { ContactService } from '../services/contact.service';
import { ApiResponse } from '../dto/product.dto';

export class ContactController {
    private service = new ContactService();

    async handlePost(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
        try {
            const body = await req.json();
            await this.service.saveInquiry(body);
            
            return NextResponse.json({
                success: true,
                data: null,
                message: "Your message has been sent successfully!",
                metadata: { total: 1, timestamp: new Date().toISOString() }
            });
        } catch (error: any) {
            return NextResponse.json({
                success: false,
                data: null,
                message: "Failed to send message",
                error: error.message
            }, { status: 500 });
        }
    }
}