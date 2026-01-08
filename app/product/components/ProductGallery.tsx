import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export const ProductGallery = ({ images, name }: { images: string[], name: string }) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
        if (!api) return;
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div className="space-y-6">
            <div className="relative group rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {images.map((img, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative aspect-square">
                                    <Image src={img} alt={name} fill className="object-cover" unoptimized />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => api?.scrollPrev()} className="bg-white/90 p-3 rounded-full shadow-lg text-blue-600 hover:bg-white cursor-pointer"><ChevronLeft /></button>
                        <button onClick={() => api?.scrollNext()} className="bg-white/90 p-3 rounded-full shadow-lg text-blue-600 hover:bg-white cursor-pointer"><ChevronRight /></button>
                    </div>
                </Carousel>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => api?.scrollTo(idx)} 
                        className={`relative w-24 h-24 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${current === idx ? 'border-[#256BE8]' : 'border-gray-100 opacity-60'}`}
                    >
                        <Image src={img} alt="thumb" fill className="object-cover" unoptimized />
                    </button>
                ))}
            </div>
        </div>
    );
};