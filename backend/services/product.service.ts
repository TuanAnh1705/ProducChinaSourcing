/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductRepository } from '../repositories/product.repository';
import { ProductDTO, FilterDTO } from '../dto/product.dto';

export class ProductService {
    private repo = new ProductRepository();

    private formatImg(url: any): string {
        if (!url || typeof url !== 'string') return "";
        const idMatch = url.match(/(?:\/d\/|id=)([\w-]+)/);
        return idMatch ? `https://lh3.googleusercontent.com/d/${idMatch[1]}` : "";
    }

    private getUniqueSplitValues(rows: any[], columnName: string): string[] {
        const values = new Set<string>();
        rows.forEach(row => {
            const cell = row.get(columnName);
            if (cell) {
                cell.split(',').forEach((v: string) => values.add(v.trim()));
            }
        });
        return Array.from(values).sort();
    }

    async getHomeData(): Promise<{ products: ProductDTO[], filters: FilterDTO }> {
        const rows = await this.repo.getRows();

        const products: ProductDTO[] = rows.map(row => {
            const d = row.toObject();
            return {
                sku: d['SKU / Product Code (TO BE LEFT BLANK)'],
                name: d['Product Name'],
                price: { min: d['Price Min (USD)'], max: d['Price Max (USD)'] },
                moq: d['MOQ'],
                unit: d['Unit'],
                category: { main: d['Main Category'], sub: d['Sub Category'] },
                specs: {
                    material: d['Material(s)'],
                    color: d['Color'],
                    dimensions: d['Dimension(s)'],
                    usage: d['Usage'],
                    features: d['Special Features']
                },
                images: [
                    this.formatImg(d['Img1']), this.formatImg(d['Img2']),
                    this.formatImg(d['Img3']), this.formatImg(d['Img4']), this.formatImg(d['Img5'])
                ].filter(Boolean),
                logo: d['Logo'] || "",
                description: d['Description'] || ""
            };
        });

        const catMap = new Map<string, Set<string>>();
        rows.forEach(row => {
            const main = row.get('Main Category');
            const sub = row.get('Sub Category');
            if (main && sub) {
                if (!catMap.has(main)) catMap.set(main, new Set());
                catMap.get(main)!.add(sub);
            }
        });

        const filters: FilterDTO = {
            categories: Array.from(catMap.entries()).map(([main, subs]) => ({
                main,
                subs: Array.from(subs).sort()
            })),
            materials: this.getUniqueSplitValues(rows, 'Material(s)'),
            usages: this.getUniqueSplitValues(rows, 'Usage'),
            features: this.getUniqueSplitValues(rows, 'Special Features')
        };

        return { products, filters };
    }
}