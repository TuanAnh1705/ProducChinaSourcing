/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { ApiResponse, HomeDataDTO } from "../dto/product.dto";
import { ProductService } from "../services/product.service";

export class ProductController {
    private service = new ProductService();

    async fetchAll() {
        try {
            const data: HomeDataDTO = await this.service.getHomeData();

            const res: ApiResponse<HomeDataDTO> = {
                success: true,
                data: data,
                message: "Fetched successfully",
                metadata: {
                    total: data.products.length,
                    timestamp: new Date().toISOString()
                }
            };

            return NextResponse.json(res);
        } catch (error: any) {
            const errorRes: ApiResponse<null> = {
                success: false,
                data: null,
                message: error.message || "Unknown error"
            };
            return NextResponse.json(errorRes, { status: 500 });
        }
    }
}