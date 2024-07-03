import { Modal } from "@/components/UI/modal";
import React from "react";
import { X } from "../../../../../public/svg/X";
import { Input } from "@/components/UI/input";
import { ProductItem } from "@/@types/interfaces/Product";
import { updateProduct } from "@/service/productsHttp";
import { CategoriesDropdown } from "./categoriesDropdown";
import { Controller, Form, FormSubmitHandler, useForm } from "react-hook-form";
import { AddProductFields } from "../addProductModal";

export default function UpdateProductModal({
  selectedProduct,
  onClose,
}: {
  selectedProduct: ProductItem;
  onClose: () => void;
}) {
  const { control, register } = useForm<AddProductFields>({
    defaultValues: {
      nome: selectedProduct.nome,
      marca: selectedProduct.marca,
      preco: selectedProduct.preco,
      cod: selectedProduct.codigo,
      categoriaId: selectedProduct.categoria.id
    },
  });

  const onSubmit: FormSubmitHandler<AddProductFields> = ({ data }) => {
    const nProduct: ProductItem = { ...selectedProduct, ...data };
    updateProduct(nProduct);
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
      <Form className="flex flex-col w-full gap-8 pt-16" onSubmit={onSubmit} control={control}>
        <div className="flex w-full gap-4">
          <Controller
            name="nome"
            control={control}
            rules={{ required: true, minLength: 3 }}
            render={({ field, fieldState }) => <Input
              label="Nome do produto"
              id="nome"
              invalid={!!fieldState.error}
              {...field}
            />}
          />
          <Controller
            name="cod"
            control={control}
            rules={{ required: true, minLength: 6 }}
            render={({ field, fieldState }) => <Input
              label="Código do produto"
              id="codigo"
              invalid={!!fieldState.error}
              {...field}
            />}
          />
        </div>
        <div className="flex justify-between w-full gap-4">
          <Controller
            name="marca"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => <Input
              label="Marca do produto"
              id="marca"
              invalid={!!fieldState.error}
              {...field}
            />}
          />
          <Controller
            name="preco"
            control={control}
            rules={{ required: true, pattern: /\d+\.?\d*/g }}
            render={({ field, fieldState }) => <Input
              label="Preço do produto"
              id="preco"
              invalid={!!fieldState.error}
              {...field}
            />}
          />
        </div>
        <CategoriesDropdown register={register} update />
        <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
          Confirmar atualização
        </button>
      </Form>
    </Modal>
  );
}