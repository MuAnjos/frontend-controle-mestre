import { ProductItem } from "@/@types/interfaces/Product";
import { getProducts } from "@/service/productsHttp";
import React, { forwardRef, useEffect, useState } from "react";
import { EstoqueFormFields } from "..";
import { UseFormRegister } from "react-hook-form";

interface ProductsDropdownProps extends React.HTMLProps<HTMLSelectElement> {
    register: UseFormRegister<EstoqueFormFields>;
    update?: boolean
}

export const ProductsDropdown = forwardRef(({
    register,
    update,
    ...props
}: ProductsDropdownProps, _) => {
    const [products, setProducts] = useState<ProductItem[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        }
        fetchProducts();
    }, []);

    return (
        <div className="bg-white w-full rounded-lg p-2">
            <label
                htmlFor="opcoes"
                className="block text-sm text-gray-500 font-semibold ml-1"
            >
                Produto
            </label>
            {products.length > 0 && <select
                id="opcoes"
                className="text-lg font-bold outline-none w-full"
                {...props}
                {...register("productId")}
            >
                {products.map((product) => (
                    <option key={product.id} value={product.id!}>
                        {product.nome}
                    </option>
                ))}
            </select>}
        </div>
    );
})
