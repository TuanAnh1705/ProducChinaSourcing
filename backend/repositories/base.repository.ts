/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSheetByTitle } from "@/lib/google-sheets";

// Định nghĩa kiểu dữ liệu hợp lệ cho 1 ô (cell) trên Google Sheet
export type SheetFieldValue = string | number | boolean | null | undefined;

export class BaseRepository<T extends Record<string, SheetFieldValue>> {
    constructor(private readonly sheetTitle: string) {}

    // Hàm thêm hàng mới (Sử dụng cho Contact/Inquiry, v.v.)
    async addRow(data: T) {
        const sheet = await getSheetByTitle(this.sheetTitle);
        if (!sheet) throw new Error(`Sheet ${this.sheetTitle} not found`);
        
        // Ép kiểu về Record để khớp với thư viện google-spreadsheet mà không dùng any
        return await sheet.addRow(data as any);
    }
}