import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { Modal } from "@/components/UI/modal";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CreateVendaReq } from "@/@types/interfaces/req/CreateVendaReq";
import { createVenda } from "@/service/vendaHttp";
import { ProductItem } from "@/@types/interfaces/Product";
import { getProducts } from "@/service/productsHttp";
import { Funcionario } from "@/@types/interfaces/Funcionario";
import { getFuncionarios } from "@/service/funcionarioHttp";

export default function AddVendaModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<{ message: string; error: boolean }>();

  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [cart, setCart] = useState<ProductItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [funci, setFunci] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      const funcionario = await getFuncionarios();
      setFuncionarios(funcionario);
    }
    fetchProducts();
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();

    if (funci !== "") {
      const nVenda: CreateVendaReq = {
        funcionarioId: funci,
        produtosId: ([] = cart.map(item => item.id)),
        quantidade: cart.length,
        valor: cart
          .map(item => parseInt(item.preco))
          .reduce((acc, valorAtual) => acc + valorAtual, 0)
      };
      console.log(nVenda);

      const response = await createVenda(nVenda);
      setStatus(response);
    }
  }

  const handleAddProduct = () => {
    if (selectedProductId) {
      const productToAdd = products.find(
        product => product.id === selectedProductId
      );

      if (productToAdd) {
        setCart([...cart, productToAdd]);
      }
    }
  };

  return (
    <>
      {status && (
        <MessageModal
          message={status.message}
          icon={status.error ? "/img/error.png" : "/img/check.png"}
          onClose={status.error ? () => setStatus(undefined) : onClose}
        />
      )}
      {!status && (
        <Modal
          onClose={onClose}
          className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col">
          <ModalHeader onClose={onClose} title="Cadastrar venda" />

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
                <button
                  onClick={handleAddProduct}
                  type="button"
                  className="mt-8 block w-1/4 bg-orange-500 rounded-xl h-10 ">
                  Adicionar produto +
                </button>
                <button
                  onClick={() => setCart([])}
                  type="button"
                  className="mt-8 block w-1/4 bg-orange-500 rounded-xl h-10 ">
                  Remover todos os produtos
                </button>
              </Modal>
            )}

            <form
              className="flex flex-col w-full gap-8 pt-16"
              onSubmit={submit}>
              <div className="flex w-full gap-4">
                <div className="bg-white w-1/2 rounded-lg p-2">
                  <label
                    htmlFor="opcoes"
                    className="block text-sm text-gray-500 font-semibold ml-1">
                    funcionario
                  </label>
                  {funcionarios.length > 0 && (
                    <select
                      id="funcionario"
                      className="text-lg font-bold outline-none w-full"
                      value={funci ?? ""}
                      onChange={e => setFunci(e.target.value)}>
                      <option value="" disabled>
                        Selecione um funcionário
                      </option>
                      {funcionarios.map(func => (
                        <option key={func.id} value={func.id}>
                          {func.nome}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
              <div className="w-full">
                <div className="mb-12 bg-orange-500 p-2 rounded-xl h-40 overflow-y-auto">
                  {cart.map(product => (
                    <div className="flex gap-4">
                      <p className="text-white font-bold text-xl">
                        Código: {product.codigo}
                      </p>
                      <p className="text-white font-bold text-xl">
                        Nome: {product.nome}
                      </p>
                      <p className="text-white font-bold text-xl">
                        Preço: {product.preco}
                      </p>
                    </div>
                  ))}

                  <p className="text-white font-bold text-xl">
                    Total:{" "}
                    {cart
                      .map(item => parseInt(item.preco))
                      .reduce((acc, valorAtual) => acc + valorAtual, 0)}
                  </p>
                </div>

                <button
                   className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end"
                  type="button"
                  onClick={() => setIsVisible(true)}>
                  Adicionar produto
                </button>
              </div>

              <button
                className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end"
                type="submit">
                Confirmar Criação
              </button>
            </form>
          </>
        </Modal>
      )}
    </>
  );
}
