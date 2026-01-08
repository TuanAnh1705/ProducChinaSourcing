import { BaseRepository } from "./base.repository";
import { ContactSheetRow } from "../dto/product.dto";

export class ContactRepository extends BaseRepository<ContactSheetRow> {
    constructor() {
        super("Inquiries"); // Tên tab trong Google Sheet
    }
}