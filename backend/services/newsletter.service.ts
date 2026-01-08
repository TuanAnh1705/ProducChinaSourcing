import { NewsletterDTO, NewsletterSheetRow } from "../dto/product.dto";
import { NewsletterRepository } from "../repositories/newsletter.repository";

export class NewsletterService {
    private repo = new NewsletterRepository();

    async subscribe (data: NewsletterDTO){
        const row: NewsletterSheetRow ={
            Timestamp: new Date().toLocaleString('vi-VN'),
            Email: data.email,
        };
        return await this.repo.addRow(row)
    }
}