import { SearchBar } from "../../searchBar";
import { Product } from "..";
import { getProducts } from "@/service/productsHttp";
import { ProductItem } from "@/@types/interfaces/Product";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { CategoryFilter } from "../categoryFilter";
import { Category } from "@/@types/interfaces/Category";

interface ProductListProps {
  onDeleteClick: (product: ProductItem) => void;
  onUpdateClick: (product: ProductItem) => void;
}

export function ProductList({
  onDeleteClick,
  onUpdateClick
}: ProductListProps) {
  const [filter, setFilter] = useState<Category>();
  const [search, setSearch] = useState("");
  const { data: products } = useQuery<ProductItem[]>({
    queryFn: () => getProducts(filter),
    initialData: [],
    queryKey: ["products", filter],
  });

  const filteredProducts = products?.filter((product) =>
    product.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SearchBar onChange={(e) => setSearch(e.currentTarget.value)} />
      <CategoryFilter
        selected={filter}
        onClick={(category: Category) => setFilter(prev => prev?.id == category.id ? undefined : category)}
      />
      <div className="mt-6 overflow-y-scroll max-h-[380px] no-scrollbar">
        {search.length > 0 && filteredProducts.map((product) => (
          <Product
            key={product.id}
            onDeleteClick={() => onDeleteClick(product)}
            onUpdateClick={() => onUpdateClick(product)}
            product={product}
          />
        ))}
        {search.length === 0 && products.map((product) => (
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
