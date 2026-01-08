"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HomeDataDTO, ProductDTO } from '@/backend/dto/product.dto';
import { ProductCard } from '@/app/components/ProductCard';
import { ChevronDown } from 'lucide-react';
import { useSearch } from '@/app/context/SearchContext';
import { ContactDialog } from '@/app/components/ContactDialog';
import { LoadingCurtain } from '../components/LoadingCurtain';
import { ProductGallery } from '../components/ProductGallery';
import { ProductSpecs } from '../components/ProductSpecs';

interface ClientProps {
  initialData: HomeDataDTO;
  product: ProductDTO;
  sku: string;
}

export default function ProductDetailClient({ initialData, product, sku }: ClientProps) {
  const router = useRouter();
  
  // Khởi tạo true để tiếp nối hiệu ứng loading từ loading.tsx
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const { setCategories, setFilters, setSelectedCategory, setSelectedSubCategory } = useSearch();

  useEffect(() => {
    // 1. Đồng bộ dữ liệu vào Search Context
    setCategories(initialData.filters.categories);
    setFilters(initialData.filters);
    
    // 2. Cuộn lên đầu trang
    window.scrollTo(0, 0);

    // 3. Tắt loading sau một khoảng ngắn để tạo hiệu ứng curtain biến mất mượt mà
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [initialData, setCategories, setFilters, sku]);

  const handleBreadcrumbClick = (category?: string, subCategory?: string) => {
    if (!category) {
      setSelectedCategory(null);
      setSelectedSubCategory(null);
    } else if (category && !subCategory) {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    } else if (category && subCategory) {
      setSelectedCategory(category);
      setSelectedSubCategory(subCategory);
    }
    router.push('/');
  };

  const similarProducts = initialData.products
    .filter(p => p.category.main === product.category.main && p.sku !== product.sku)
    .reverse()
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white md:-mt-10">
      {/* LoadingCurtain sẽ nhận nhiệm vụ "mở màn" ra khi setIsLoading(false) */}
      <LoadingCurtain isLoading={isLoading} />
      
      <main className="max-w-360 mx-auto p-6 md:p-10 lg:p-16">
        {/* INTERACTIVE BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-8 font-medium">
          <span 
            onClick={() => handleBreadcrumbClick()} 
            className="hover:text-[#256BE8] cursor-pointer transition-colors"
          >
            All Categories
          </span>
          <span>{">"}</span>
          <span 
            onClick={() => handleBreadcrumbClick(product.category.main)} 
            className="hover:text-[#256BE8] cursor-pointer transition-colors"
          >
            {product.category.main}
          </span>
          <span>{">"}</span>
          <span 
            onClick={() => handleBreadcrumbClick(product.category.main, product.category.sub)} 
            className="hover:text-[#256BE8] cursor-pointer transition-colors text-gray-600"
          >
            {product.category.sub}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <ProductGallery images={product.images} name={product.name} />

          <div className="space-y-4">
            <div>
              <h1 className="md:text-4xl text-2xl font-medium text-[#1E0F48] leading-tight">{product.name}</h1>
              <p className="text-md md:text-lg text-gray-400 font-mono tracking-widest">#{product.sku}</p>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-3xl md:text-5xl font-semibold text-[#1E0F48]">${product.price.min} - {product.price.max}</span>
              <span className="text-lg text-[#27308D]">/Piece (FOB Price)</span>
            </div>
            <p className="text-[#27308D] font-medium text-sm md:text-md tracking-wider uppercase">MOQ: {product.moq} pieces</p>
            
            <ContactDialog>
              <button className="w-full bg-[#256BE8] text-white py-5 rounded-md font-medium text-xl hover:bg-blue-800 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] cursor-pointer">
                Get a Free Quote
              </button>
            </ContactDialog>

            <ProductSpecs product={product} />
          </div>
        </div>

        {/* DESCRIPTION SECTION */}
        <div className="mb-24 flex flex-col items-center">
          <div className={`relative w-full transition-[max-height] duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-500' : 'max-h-87.5'}`}>
            <div className="w-full bg-[#E9F0FF]/30 border border-[#236BE7] rounded-lg p-10 md:p-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#1E0F48] mb-10">Description</h2>
              <div className="text-[#585858] leading-relaxed text-md md:text-xl max-w-5xl mx-auto whitespace-pre-line text-center">
                {product.description}
              </div>
            </div>
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-white via-white/80 to-transparent pointer-events-none" />
            )}
          </div>
          <div className="-mt-5 z-10">
            <button onClick={() => setIsExpanded(!isExpanded)} className="inline-flex items-center gap-2 bg-white border border-[#91B5F3] px-8 py-2.5 rounded-md font-medium text-[#256BE8] hover:bg-gray-50 transition-all active:scale-95 cursor-pointer shadow-sm">
              {isExpanded ? "Show Less" : "Load More"}
              <ChevronDown className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} size={20} />
            </button>
          </div>
        </div>

        {/* SIMILAR PRODUCTS SECTION */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1E0F48] mb-12 tracking-tight">
            Find Similar Products in {product.category.main}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {similarProducts.length > 0 ? (
              similarProducts.map(p => (
                <ProductCard 
                  key={p.sku} 
                  product={p} 
                  showSpecs={false} 
                  showButton={false} 
                  showSku={false} 
                  showPriceUnit={false} 
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400 italic py-10">No other products found in this category.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}