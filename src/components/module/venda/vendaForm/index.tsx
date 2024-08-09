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
import { useEffect, useState } from "react";
import { Modal } from "@/components/UI/modal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { getProducts } from "@/service/productsHttp";

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
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    if (selectedProductId) {
      const productToAdd = products.find(
        product => product.id === selectedProductId
      );

      if (
        productToAdd
      ) {
        setCart([...cart, productToAdd]);
      }
    }
  };

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

          <div className="bg-white w-full rounded-lg p-2">
            <label
              htmlFor="opcoes"
              className="block text-sm text-gray-500 font-semibold ml-1">
              Produto
            </label>
            {products.length > 0 && (
              <select
                id="opcoes"
                className="text-lg font-bold outline-none w-full"
                value={selectedProductId ?? ""}
                onChange={e => setSelectedProductId(e.target.value)}>
                <option value="" disabled>
                  Selecione um produto
                </option>
                {products.map((product: ProductItem) => (
                  <option key={product.id} value={product.id!}>
                    {product.nome}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button onClick={handleAddProduct} type="button">
            Adicionar produto +
          </button>
        </Modal>
      )}

      <Form
        className="flex flex-col w-full gap-8 pt-16"
        onSubmit={onSubmit}
        control={control}>
        <div className="flex w-full gap-4">
          <FuncionarioDropdown register={register} update={update} />
        </div>
        <div className="w-full gap-4">
          <div className="">

          </div>
          {cart.map(product => (
            <div className="flex ">
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
