"use client";

import { useEffect, useState, useMemo } from "react";
import { HomeDataDTO } from "@/backend/dto/product.dto";
import { Sidebar } from "./components/Sidebar";
import { ProductCard } from "./components/ProductCard";
import { useSearch } from "./context/SearchContext";
import { LoadingCurtain } from "./product/components/LoadingCurtain";

interface Props {
  initialData: HomeDataDTO;
}

export default function HomeClient({ initialData }: Props) {
  const [data] = useState<HomeDataDTO>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const {
    searchTerm, moqValue, priceValue,
    selectedCategory, selectedSubCategory,
    selectedMaterial, selectedUsage, selectedFeature,
    setMoqValue, setPriceValue,
    setCategories, setFilters
  } = useSearch();

  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Init filters
  useEffect(() => {
    setCategories(initialData.filters.categories);
    setFilters(initialData.filters);
    setTimeout(() => setIsLoading(false), 600);
  }, [initialData, setCategories, setFilters]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    return data.products.filter((p) => {
      const moq = parseInt(p.moq.toString().replace(/\D/g, ""), 10);
      const matchMoq = moqValue !== null ? moq <= moqValue : true;

      const minPrice = parseFloat(p.price.min);
      const maxPrice = parseFloat(p.price.max);
      const matchPrice =
        priceValue !== null
          ? priceValue >= minPrice && priceValue <= maxPrice
          : true;

      const matchSearch =
        debouncedSearch === "" ||
        p.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        p.sku.toLowerCase().includes(debouncedSearch.toLowerCase());

      const normalize = (s?: string | null) => s?.toLowerCase().trim() ?? "";

      return (
        matchMoq &&
        matchPrice &&
        matchSearch &&
        (!selectedCategory || normalize(p.category.main) === normalize(selectedCategory)) &&
        (!selectedSubCategory || normalize(p.category.sub) === normalize(selectedSubCategory)) &&
        (!selectedMaterial || normalize(p.specs.material).includes(normalize(selectedMaterial))) &&
        (!selectedUsage || normalize(p.specs.usage).includes(normalize(selectedUsage))) &&
        (!selectedFeature || normalize(p.specs.features).includes(normalize(selectedFeature)))
      );
    });
  }, [
    data,
    moqValue,
    priceValue,
    debouncedSearch,
    selectedCategory,
    selectedSubCategory,
    selectedMaterial,
    selectedUsage,
    selectedFeature,
  ]);

  return (
    <main className="max-w-360 mx-auto min-h-screen bg-white">
      <LoadingCurtain isLoading={isLoading} />

      <div className="flex flex-col md:flex-row gap-8 p-4 md:p-10">
        <aside className="hidden md:block w-72 shrink-0">
          <Sidebar
            filters={data.filters}
            onMoqChange={(v) => setMoqValue(v ? parseInt(v) : null)}
            onPriceSearchChange={(v) => setPriceValue(v ? parseFloat(v) : null)}
          />
        </aside>

        <section className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400">
              No products matching your filters.
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
