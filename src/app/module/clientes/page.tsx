"use client";

import { useState } from "react";
import { DeleteModal } from "@/components/UI/deleteModal";
import UpdateProductModal from "@/components/module/product/updateProductModal";
import { deleteProduct } from "@/service/productsHttp";
import { BottomButton } from "@/components/UI/bottomButton";
import AddClienteModal from "@/components/module/clientes/addClienteModal";
import { Cliente } from "@/@types/interfaces/Cliente";
import { ClienteList } from "@/components/module/clientes/clienteList";
import { UpdateClienteModal } from "@/components/module/clientes/updateClienteModal";

const CLIENTE: Cliente = {
  "id": 1,
  "nome": "Gerdany",
  "cpf": "12345678912",
  "endereco": {
    "id": 4,
    "cidade": "Vitória da Conquista",
    "cep": 12345678,
    "numero": 123,
    "rua": "rua",
    "bairro": "Bairro",
    "complemento": "complemento"
  },
  "dataNascimento": "2004-12-10",
  "sexo": "MASCULINO"
}

export default function Produtos() {
  const [selectedCliente, setSelectedCliente] = useState<Cliente>();
  const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

  function onDeleteClick(item: Cliente) {
    setSelectedCliente(item);
    setModal("removing");
  }

  function onUpdateClick(product: Cliente) {
    setModal("updating");
    setSelectedCliente(product);
  }

  return (
    <div className="flex flex-col pt-5">
      {modal === "removing" && (
        <DeleteModal
          onConfirmPress={() => deleteProduct(selectedCliente?.id.toString()!)}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === "updating" && (
        <UpdateClienteModal
          selectedCliente={selectedCliente!}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === "adding" && (
        <AddClienteModal
          onClose={() => setModal(undefined)}
        />
      )}
      <ClienteList onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} />
      <BottomButton text="Cadastrar novo Cliente +" onClick={() => setModal("adding")} />
    </div>
  );
}
