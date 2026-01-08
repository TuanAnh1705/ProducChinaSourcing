// app/product/[sku]/loading.tsx

import { LoadingCurtain } from "../components/LoadingCurtain";

export default function Loading() {
    // Luôn truyền isLoading={true} vì file này chỉ hiện khi đang tải
    return <LoadingCurtain isLoading={true} />;
}