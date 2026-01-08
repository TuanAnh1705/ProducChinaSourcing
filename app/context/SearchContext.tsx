"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { HomeDataDTO } from "@/backend/dto/product.dto";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  moqValue: number | null;
  setMoqValue: (v: number | null) => void;
  priceValue: number | null;
  setPriceValue: (v: number | null) => void;

  // State dành cho Sidebar Filter
  selectedCategory: string | null;
  setSelectedCategory: (v: string | null) => void;
  selectedSubCategory: string | null;
  setSelectedSubCategory: (v: string | null) => void;
  selectedMaterial: string | null;
  setSelectedMaterial: (v: string | null) => void;
  selectedUsage: string | null;
  setSelectedUsage: (v: string | null) => void;
  selectedFeature: string | null;
  setSelectedFeature: (v: string | null) => void;

  // Data trung chuyển
  categories: HomeDataDTO['filters']['categories'] | null;
  setCategories: (v: HomeDataDTO['filters']['categories'] | null) => void;
  filters: HomeDataDTO['filters'] | null;
  setFilters: (v: HomeDataDTO['filters'] | null) => void;
}

const SearchContext = createContext<SearchState | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [moqValue, setMoqValue] = useState<number | null>(null);
  const [priceValue, setPriceValue] = useState<number | null>(null);
  
  // State Filter Sidebar
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedUsage, setSelectedUsage] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);

  const [categories, setCategories] = useState<HomeDataDTO['filters']['categories'] | null>(null);
  const [filters, setFilters] = useState<HomeDataDTO['filters'] | null>(null);

  return (
    <SearchContext.Provider
      value={{
        searchTerm, setSearchTerm,
        moqValue, setMoqValue,
        priceValue, setPriceValue,
        selectedCategory, setSelectedCategory,
        selectedSubCategory, setSelectedSubCategory,
        selectedMaterial, setSelectedMaterial,
        selectedUsage, setSelectedUsage,
        selectedFeature, setSelectedFeature,
        categories, setCategories,
        filters, setFilters
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}