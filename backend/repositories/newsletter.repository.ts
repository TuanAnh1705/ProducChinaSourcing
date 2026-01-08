import { NewsletterSheetRow } from "../dto/product.dto";
import { BaseRepository } from "./base.repository";

export class NewsletterRepository extends BaseRepository<NewsletterSheetRow>{
    constructor(){
        super("Newsletter");
    }
}