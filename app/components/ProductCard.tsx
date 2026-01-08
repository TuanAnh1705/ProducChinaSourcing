"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { ProductDTO } from '@/backend/dto/product.dto';
import { ContactDialog } from './ContactDialog';

interface ProductCardProps {
  product: ProductDTO;
  showSpecs?: boolean;
  showButton?: boolean;
  showSku?: boolean;
  showPriceUnit?: boolean;
}

export function ProductCard({ 
  product, 
  showSpecs = true, 
  showButton = true, 
  showSku = true, 
  showPriceUnit = true 
}: ProductCardProps) {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  return (
    <div className="group border border-gray-100 rounded-md overflow-hidden bg-white flex flex-col hover:shadow-xl transition-all">
      
      {/* 1. PHẦN HÌNH ẢNH: Link bọc ảnh nhưng né nút điều hướng */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{ align: "start", loop: true, dragFree: false }}
        >
          <CarouselContent className="ml-0">
            {product.images.map((img, idx) => (
              <CarouselItem key={idx} className="pl-0">
                <Link
                  href={`/product/${product.sku}`}
                  className="relative aspect-square block cursor-pointer"
                  onClick={(e) => {
                    if (api && api.scrollSnapList().length > 1) {
                      const wasDragging = Math.abs(api.scrollProgress() - Math.round(api.scrollProgress())) > 0.01;
                      if (wasDragging) e.preventDefault();
                    }
                  }}
                >
                  <Image
                    src={img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700"
                    unoptimized
                    draggable={false}
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* NÚT ĐIỀU HƯỚNG: Sử dụng pointer-events-none để không chặn Link bên dưới */}
          <div className="hidden md:flex absolute inset-0 items-center justify-between px-2 md:px-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
            <CarouselPrevious className="static translate-x-0 h-8 w-8 md:h-10 md:w-10 bg-white/90 text-blue-600 border-none shadow-xl cursor-pointer pointer-events-auto" />
            <CarouselNext className="static translate-x-0 h-8 w-8 md:h-10 md:w-10 bg-white/90 text-blue-600 border-none shadow-xl cursor-pointer pointer-events-auto" />
          </div>

          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 text-white text-[10px] md:text-[11px] px-3 py-1 rounded-full backdrop-blur-sm z-10 pointer-events-none">
              {current} / {product.images.length}
            </div>
          )}
        </Carousel>
      </div>

      {/* 2. PHẦN THÔNG TIN */}
      <div className="p-4 md:p-5 lg:p-6 flex-1 flex flex-col relative">
        <Link href={`/product/${product.sku}`} className="flex-1 flex flex-col">
          <div className="relative z-10 flex-1 space-y-3 pointer-events-none">
            <h2 className="text-lg md:text-xl lg:text-2xl text-[#1E0F48] font-medium line-clamp-2 leading-tight hover:text-blue-600 transition-colors pointer-events-auto">
              {product.name}
            </h2>

            {showSku && (
              <p className="text-xs md:text-sm text-gray-400 font-mono tracking-widest pointer-events-auto">
                #{product.sku}
              </p>
            )}

            <div className="flex flex-wrap items-baseline gap-1 md:gap-2 pointer-events-auto">
              <span className="text-xl md:text-2xl lg:text-3xl font-semibold text-[#1E0F48]">
                ${product.price.min} - {product.price.max}
              </span>
              {showPriceUnit && (
                <span className="text-xs md:text-sm lg:text-[15px] text-[#27308D]">
                  /{product.unit} (FOB Price)
                </span>
              )}
            </div>

            <div className="inline-block bg-blue-50 px-3 py-1 rounded-lg pointer-events-auto">
              <p className="text-[#27308D] text-xs md:text-sm font-medium">
                MOQ: {product.moq} {product.unit}
              </p>
            </div>

            {showSpecs && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 md:gap-y-4 pt-4 mt-2 border-t border-gray-50 pointer-events-auto">
                <SpecSummary label="Material" value={product.specs.material} />
                <SpecSummary label="Dimensions" value={product.specs.dimensions} />
                <SpecSummary label="Usage" value={product.specs.usage} />
                <SpecSummary label="Color" value={product.specs.color} />
                <div className="col-span-2">
                  <SpecSummary label="Special Features" value={product.specs.features} />
                </div>
              </div>
            )}
          </div>
        </Link>

        {showButton && (
          <div className="relative z-20 mt-4 md:mt-6 lg:mt-8">
            <ContactDialog>
              <button className="w-full md:w-auto md:self-start bg-[#256BE8] text-white py-2.5 md:py-3 px-6 md:px-8 rounded-md hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 text-sm md:text-md active:scale-95 cursor-pointer">
                Contact Us
              </button>
            </ContactDialog>
          </div>
        )}
      </div>
    </div>
  );
}

function SpecSummary({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5 md:space-y-1">
      <p className="text-xs md:text-sm text-gray-400 tracking-tight">{label}</p>
      <p className="text-xs md:text-sm text-gray-600 font-medium leading-snug line-clamp-2" title={value}>
        {value || "N/A"}
      </p>
    </div>
  );
}