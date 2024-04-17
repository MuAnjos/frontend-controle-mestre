"use client";

import { PRODUCTS } from "@/util/constants/Products";
import Product from "@/components/module/product";
import { SearchBar } from "@/components/module/searchBar";
import { useEffect, useState } from "react";

export default function Produtos() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toUpperCase().includes(search.toUpperCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  return (
    <div className="h-full">
      <SearchBar
        onChange={(e) => {
          setSearch(e.currentTarget?.value);
        }}
      />
      <div className="mt-6 overflow-scroll h-4/6">
        {filteredProducts.map((product) => (
          <Product
            key={product.id}
            onDeleteClick={() => {
              setProducts((prevProducts) =>
                prevProducts.filter((p) => p.id !== product.id)
              );
            }}
            product={product}
          />
        ))}
      </div>
      <div className="mt-6 text-end">
        <button className="px-4 py-3 text-xl font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600">
          Cadastrar novo produto +
        </button>
      </div>
    </div>
  );
}
