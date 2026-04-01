import { ImageController } from '@/backend/controllers/image.controller';
import { NextRequest } from 'next/server';

const controller = new ImageController();

export const GET = (req: NextRequest) => controller.handleGet(req);
