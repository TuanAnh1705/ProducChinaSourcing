import { NewsletterController } from "@/backend/controllers/newsletter.controller";
import { NextRequest } from "next/server";

const controller = new NewsletterController();

export async function POST(req: NextRequest) {
    return controller.handlePost(req);
}