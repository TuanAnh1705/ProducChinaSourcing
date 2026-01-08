import { ProductDTO } from '@/backend/dto/product.dto';

const DetailRow = ({ label, value, isGray }: { label: string, value: string, isGray?: boolean }) => (
    <tr className={`${isGray ? 'bg-[#E9F0FF]/20' : 'bg-white'} border-b border-gray-300 last:border-0`}>
        <td className="p-4 md:p-5 text-[#525252] text-sm md:text-md font-medium border-r border-gray-300 w-1/3">{label}</td>
        <td className="p-4 md:p-5 text-[#525252] text-sm md:text-md">{value}</td>
    </tr>
);

export const ProductSpecs = ({ product }: { product: ProductDTO }) => (
    <div className="pt-4">
        <h3 className="text-3xl font-semibold text-[#1E0F48] mb-6 tracking-tight">Product Details</h3>
        <div className="border border-gray-300 rounded-md overflow-hidden bg-white shadow-sm">
            <table className="w-full border-collapse">
                <tbody>
                    <DetailRow label="Product Name" value={product.name} isGray />
                    <DetailRow label="Material" value={product.specs.material} />
                    <DetailRow label="Color" value={product.specs.color} isGray />
                    <DetailRow label="Size/Dimension" value={product.specs.dimensions} />
                    <DetailRow label="Usage" value={product.specs.usage} isGray />
                    <DetailRow label="Logo" value={product.logo || "Customizable"} />
                    <DetailRow label="Special Features" value={product.specs.features} isGray />
                </tbody>
            </table>
        </div>
    </div>
);