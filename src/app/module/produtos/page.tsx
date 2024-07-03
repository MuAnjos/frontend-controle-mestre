"use client";

import { useState } from "react";
import { DeleteProductModal } from "@/components/module/product/deleteProductModal";
import { ProductItem } from "@/@types/interfaces/Product";
import UpdateProductModal from "@/components/module/product/updateProductModal";
import { ProductList } from "@/components/module/product/productList";
import AddProductModal from "@/components/module/product/addProductModal";

export default function Produtos() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem>();
  const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

  function onDeleteClick(item: ProductItem) {
    setSelectedProduct(item);
    setModal("removing");
  }

  function onUpdateClick(product: ProductItem) {
    setModal("updating");
    setSelectedProduct(product);
  }

  return (
    <div className="flex flex-col pt-5">
      {modal === "removing" && (
        <DeleteProductModal
          selectedProduct={selectedProduct?.id!}
          onClose={() => setModal(undefined)}
          onFinish={() => setModal("success")}
        />
      )}
      {modal === "updating" && (
        <UpdateProductModal
          selectedProduct={selectedProduct!}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === "adding" && (
        <AddProductModal
          onClose={() => setModal(undefined)}
        />
      )}
      <ProductList
        onDeleteClick={onDeleteClick}
        onUpdateClick={onUpdateClick}
      />
      <div className="absolute mt-6 bottom-4 right-10">
        <button className="px-4 py-3 text-xl font-semibold text-white bg-orange-500 rounded-xl hover:bg-orange-600" onClick={() => setModal("adding")}>
          Cadastrar novo produto +
        </button>
      </div>
    </div>
  );
}
