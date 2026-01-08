/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { NewsletterService } from "../services/newsletter.service";
import { ApiResponse } from "../dto/product.dto";

export class NewsletterController {
    private service = new NewsletterService();

    async handlePost(req: NextRequest): Promise<NextResponse<ApiResponse<null>>> {
        try {
            const body = await req.json();

            if (!body.email || !body.email.includes('@')) {
                return NextResponse.json({
                    success: false, data: null, message: "Invalid email", error: "Invalid email"
                }, { status: 400 });
            }

            await this.service.subscribe(body);

            return NextResponse.json({
                success: true,
                data: null,
                message: "Thank you for subscribing!",
                metadata: { total: 1, timestamp: new Date().toISOString() }
            });

        } catch (error: any) {
            return NextResponse.json({
                success: false, data: null, message: "Subscription failed!", error: error.message
            }, { status: 500 });
        }
    }
}