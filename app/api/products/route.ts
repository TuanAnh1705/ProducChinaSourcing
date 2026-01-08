import { ProductController } from "@/backend/controllers/product.controller";

const controller = new ProductController();
export const GET = () => controller.fetchAll();