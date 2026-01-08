import { ApiResponse, HomeDataDTO } from '@/backend/dto/product.dto';
import ProductDetailClient from './ProductDetailClient';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ sku: string }>;
}

// Hàm fetch dữ liệu trên Server
async function getProductData() {
    try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/products`, {
        cache: 'no-store', // Đảm bảo luôn lấy dữ liệu mới (SSR)
    });

    if (!res.ok) return null;

    const result: ApiResponse<HomeDataDTO> = await res.json();
    return result.success ? result.data : null;
  } catch (err) {
    console.error('Product SSR fetch error:', err);
    return null;
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { sku } = await params;
    const data = await getProductData();

    if (!data) return notFound();

    const product = data.products.find((p) => p.sku === sku);
    if (!product) return notFound();

    // Truyền dữ liệu xuống Client Component để xử lý logic tương tác
    return <ProductDetailClient initialData={data} product={product} sku={sku} />;
}