import { ContactController } from '@/backend/controllers/contact.controller';

const controller = new ContactController();

export async function POST(req: Request) {
    return controller.handlePost(req);
}