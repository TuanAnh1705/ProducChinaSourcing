// app/page.tsx (SERVER COMPONENT)

import { ApiResponse, HomeDataDTO } from "@/backend/dto/product.dto";
import HomeClient from "./HomeClient";

async function getHomeData(): Promise<HomeDataDTO | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: "no-store", // hoặc revalidate nếu muốn ISR
    });

    const json: ApiResponse<HomeDataDTO> = await res.json();
    return json.success ? json.data : null;
  } catch (err) {
    console.error("Home SSR fetch error:", err);
    return null;
  }
}

export default async function HomePage() {
  const data = await getHomeData();

  if (!data) {
    return null; // hoặc Error UI
  }

  return <HomeClient initialData={data} />;
}
