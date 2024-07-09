import React from "react";
import { Modal } from "@/components/UI/modal";
import { X } from "../../../../../public/svg/X";
import { ProductItem } from "@/@types/interfaces/Product";
import { updateProduct } from "@/service/productsHttp";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { UpdateProductReq } from "@/@types/interfaces/req/UpdateProductReq";
import { ProductForm, ProductFormFields } from "../productForm";

export default function UpdateProductModal({
  selectedProduct,
  onClose,
}: {
  selectedProduct: ProductItem;
  onClose: () => void;
}) {
  const { control, register } = useForm<ProductFormFields>({
    defaultValues: {
      nome: selectedProduct.nome,
      marca: selectedProduct.marca,
      preco: selectedProduct.preco,
      cod: selectedProduct.codigo,
      categoriaId: selectedProduct.categoria.id
    },
  });

  const onSubmit: FormSubmitHandler<ProductFormFields> = async ({ data }) => {
    console.log(data.categoriaId)
    const updatedProduct: UpdateProductReq = {
      id: selectedProduct.id!,
      nome: data.nome,
      marca: data.marca,
      categoriaId: data.categoriaId,
      preco: +data.preco,
      codigo: +data.cod
    }
    await updateProduct(updatedProduct);
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
      <ProductForm onSubmit={onSubmit} control={control} register={register} update />
    </Modal>
  );
}