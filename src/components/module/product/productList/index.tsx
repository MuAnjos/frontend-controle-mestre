import { SearchBar } from "../../searchBar";
import { Product } from "..";
import { getProducts } from "@/service/productsHttp";
import { ProductItem } from "@/@types/interfaces/Product";
import { useQuery } from "@tanstack/react-query";

interface ProductListProps {
  onDeleteClick: (product: ProductItem) => void;
  onUpdateClick: (product: ProductItem) => void;
}

export function ProductList({
  onDeleteClick,
  onUpdateClick,
}: ProductListProps) {
  const { data: products } = useQuery<ProductItem[]>({
    queryFn: () => getProducts(),
    initialData: [],
    queryKey: ["products"],
  });
  return (
    <>
      <SearchBar onChange={(e) => {}} />
      <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
        {products.map((product) => (
          <Product
            key={product.id}
            onDeleteClick={() => onDeleteClick(product)}
            onUpdateClick={() => onUpdateClick(product)}
            product={product}
          />
        ))}
      </div>
    </>
  );
}
