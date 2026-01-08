import { ContactController } from '@/backend/controllers/contact.controller';
import { NextRequest } from 'next/server';

const controller = new ContactController();

export async function POST(req: NextRequest) {
    return controller.handlePost(req);
}