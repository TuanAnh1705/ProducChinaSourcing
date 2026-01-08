export interface ApiResponse<T> {
    success : boolean;
    data: T | null;
    message: string;
    error?: string;
    metadata?: {
        total : number;
        timestamp: string;
    }
}

//dữ liệu từ footer gửi
export interface NewsletterDTO {
    email: string;
}

//cấu trúc hàng trong tab Newsletter trong ggsheet
export interface NewsletterSheetRow {
    Timestamp: string;
    Email: string;
    [key: string]: string | number | boolean | null | undefined;
}

// Dữ liệu từ Form gửi lên
export interface ContactDTO {
    name: string;
    email: string;
    companyName: string;
    website: string;
    moq: string;
    message: string;
}

// Cấu trúc hàng trong Google Sheet (Dùng cho Generics)
export interface ContactSheetRow {
    Timestamp: string;
    Name: string;
    Email: string;
    Company: string;
    Website: string;
    MOQ: string;
    Message: string;
    [key: string]: string | number | boolean | null | undefined; // Thay thế 'any' bằng type an toàn
}

export interface ProductDTO{
    sku: string;
    name: string;
    price: { min: string; max: string };
    moq: string;
    unit: string;
    category:{main: string; sub: string};
    specs:{
        material: string;
        color: string;
        dimensions: string;
        usage: string;
        features: string;
    };
    images: string[];
    logo: string;
    description: string;
}

export interface FilterDTO {
  categories: { main: string; subs: string[] }[];
  materials: string[];
  usages: string[];
  features: string[];
}

export interface HomeDataDTO {
  products: ProductDTO[];
  filters: FilterDTO;
}

