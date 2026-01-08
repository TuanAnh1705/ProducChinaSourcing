import { ContactDTO, ContactSheetRow } from '../dto/product.dto';
import { ContactRepository } from '../repositories/contact.repository';

export class ContactService {
    private repo = new ContactRepository();

    async saveInquiry(data: ContactDTO) {
        const row: ContactSheetRow = {
            Timestamp: new Date().toLocaleString('vi-VN'),
            Name: data.name,
            Email: data.email,
            Company: data.companyName,
            Website: data.website,
            MOQ: data.moq,
            Message: data.message
        };
        return await this.repo.addRow(row);
    }
}