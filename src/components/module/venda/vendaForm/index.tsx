"use client";

import {
  Form,
  Controller,
  FormSubmitHandler,
  Control,
  UseFormRegister
} from "react-hook-form";

import { ProductItem } from "@/@types/interfaces/Product";
import { ClienteDropdown } from "../clienteDropdown";
import { FuncionarioDropdown } from "../funcionarioDropdown";
import { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { EstoqueForm } from "../../estoque/estoqueForm";
import { QuantityPicker } from "../../estoque/estoqueForm/quantityPicker";
import { ProductsDropdownM } from "./form/productDropdown";

export interface VendaFormFields {
  funcionarioId: string;
  clienteId: string;
  produtos: ProductItem[];
  total: string;
}

interface ProductFormProps {
  update?: boolean;
  onSubmit: FormSubmitHandler<VendaFormFields>;
  control: Control<VendaFormFields, any> | undefined;
  register: UseFormRegister<VendaFormFields>;
}

export function VendaForm({
  update,
  control,
  onSubmit,
  register
}: ProductFormProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);

  return (
    <>
      {isVisible && (
        <Modal
          onClose={() => setIsVisible(false)}
          className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col">
          <ModalHeader
            onClose={() => setIsVisible(false)}
            title="Cadastrar produto"
          />

          <ProductsDropdownM register={register} />
        </Modal>
      )}

      <Form
        className="flex flex-col w-full gap-8 pt-16"
        onSubmit={onSubmit}
        control={control}>
        <div className="flex w-full gap-4">
          <ClienteDropdown register={register} update={update} />
          <FuncionarioDropdown register={register} update={update} />
        </div>
        <div className="w-full gap-4">
          {products.map(product => (
            <div>
              <p>{product.codigo}</p>
              <p>{product.nome}</p>
              <p>{product.preco}</p>
            </div>
          ))}

          <button
            className="block w-1/4 bg-white pg-2 rounded-xl h-18"
            type="button"
            onClick={() => setIsVisible(true)}>
            Adicionar produto +
          </button>
        </div>

        <button
          className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end"
          type="submit">
          Confirmar {update ? "Atualização" : "Criação"}
        </button>
      </Form>
    </>
  );
}
