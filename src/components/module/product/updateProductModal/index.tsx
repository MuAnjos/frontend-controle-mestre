import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { ProductItem } from "@/@types/interfaces/Product";
import { updateProduct } from "@/service/productsHttp";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { UpdateProductReq } from "@/@types/interfaces/req/UpdateProductReq";
import { ProductForm, ProductFormFields } from "../productForm";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";

export default function UpdateProductModal({
  selectedProduct,
  onClose,
}: {
  selectedProduct: ProductItem;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<{ message: string; error: boolean }>();
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
    const updatedProduct: UpdateProductReq = {
      id: selectedProduct.id!,
      nome: data.nome,
      marca: data.marca,
      categoriaId: data.categoriaId,
      preco: +data.preco,
      codigo: +data.cod
    }
    const response = await updateProduct(updatedProduct);
    setStatus(response);
  }

  return (
    <>
      {status && <MessageModal
        message={status.message}
        icon={status.error ? "/img/error.png" : "/img/check.png"}
        onClose={status.error ? () => setStatus(undefined) : onClose}
      />}
      {!status && <Modal
        onClose={onClose}
        className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col"
      >
        <ModalHeader title="Atualizar o Produto" onClose={onClose} />
        <ProductForm onSubmit={onSubmit} control={control} register={register} update />
      </Modal>}
    </>
  );
}