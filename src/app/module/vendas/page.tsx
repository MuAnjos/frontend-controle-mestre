"use client";
import { useState } from "react";
import { DeleteModal } from "@/components/UI/deleteModal";
import { BottomButton } from "@/components/UI/bottomButton";
import { VendaList } from "@/components/module/venda/vendaList";
import { ItemVenda } from "@/@types/interfaces/Venda";
import { deleteVenda } from "@/service/vendaHttp";
import AddVendaModal from "@/components/module/venda/addVendaModal";
import UpdateVendaModal from "@/components/module/venda/updateVendaModal";

export default function Vendas() {
  const [selectedVenda, setSelectedVenda] = useState<ItemVenda>();
  const [modal, setModal] = useState<
    "removing" | "adding" | "updating" | "success" | "categories"
  >();

  function onDeleteClick(item: ItemVenda) {
    setSelectedVenda(item);
    setModal("removing");
  }

  function onUpdateClick(product: ItemVenda) {
    setModal("updating");
    setSelectedVenda(product);
  }

  return (
    <div className="flex flex-col pt-5">
      {modal === "removing" && (
        <DeleteModal
          message="Você deseja realmente deletar essa venda?"
          onConfirmPress={() => deleteVenda(selectedVenda?.id!)}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === "updating" && (
        <UpdateVendaModal
          selectedVenda={selectedVenda!}
          onClose={() => setModal(undefined)}
        />
      )}
      {modal === "adding" && (
        <AddVendaModal onClose={() => setModal(undefined)} />
      )}

     
      <VendaList onDeleteClick={onDeleteClick} onUpdateClick={onUpdateClick} />

      <BottomButton
        text="Cadastrar nova Venda +"
        onClick={() => setModal("adding")}
      />
    </div>
  );
}
