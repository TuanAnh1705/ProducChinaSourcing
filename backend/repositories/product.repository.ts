import { getSheet } from "@/lib/google-sheets";

export class ProductRepository{
    async getRows() {
        const sheet = await getSheet();
        return await sheet.getRows();
    }
}