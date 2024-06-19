import { Modal } from "@/components/UI/modal";
import React from "react";
import { X } from "../../../../../public/svg/X";
import { Input } from "@/components/UI/input";
import { ProductItem } from "@/@types/interfaces/Product";
import { updateProduct } from "@/service/productsHttp";
import { CategoriesDropdown } from "./categoriesDropdown";

export default function UpdateProductModal({
  selectedProduct,
  onClose,
}: {
  selectedProduct: ProductItem;
  onClose: () => void;
}) {
  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);
    const nProduct: ProductItem = { ...selectedProduct, ...data };
    await updateProduct(nProduct);
    onClose();
  }
  return (
    <Modal
      onClose={onClose}
      className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col"
    >
      <div className="flex justify-between w-full">
        <h1 className="mx-auto text-3xl font-bold text-white">
          Atualizar o Produto
        </h1>
        <button onClick={onClose}>
          <X />
        </button>
      </div>
      <form className="flex flex-col w-full gap-8 pt-16" action={handleSubmit}>
        <div className="flex w-full gap-4">
          <Input
            label="Nome do produto"
            id="nome"
            defaultValue={selectedProduct.nome}
          />
          <Input
            label="Código do produto"
            id="codigo"
            defaultValue={selectedProduct.codigo}
          />
        </div>
        <div className="flex justify-between w-full gap-4">
          <Input
            label="Marca do produto"
            id="marca"
            defaultValue={selectedProduct.marca}
          />
          <Input
            label="Preço do produto"
            id="preco"
            type="number"
            defaultValue={selectedProduct.preco}
          />
        </div>
        <CategoriesDropdown productCategory={selectedProduct.categoria} />
        <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
          Confirmar atualização
        </button>
      </form>
    </Modal>
  );
}
