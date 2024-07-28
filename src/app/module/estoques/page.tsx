"use client";

import React, { useState } from 'react'
import { BottomButton } from '@/components/UI/bottomButton';
import { DeleteModal } from '@/components/UI/deleteModal';
import AddEstoqueModal from '@/components/module/estoque/addEstoqueModal';
import { Estoque } from '@/@types/interfaces/Estoque';
import { deleteEstoque } from '@/service/estoqueHttp';
import { UpdateEstoqueModal } from '@/components/module/estoque/updateEstoqueModal';
import { EstoqueList } from '@/components/module/estoque/estoqueList';

export default function Estoques() {
    const [selectedEstoque, setSelectedEstoque] = useState<Estoque>();
    const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

    function onDeleteClick(estoque: Estoque) {
        setSelectedEstoque(estoque);
        setModal("removing");
    }

    function onUpdateClick(estoque: Estoque) {
        setModal("updating");
        setSelectedEstoque(estoque);
    }

    return (
        <div className="flex flex-col pt-5">
            {modal === "removing" && (
                <DeleteModal
                    message="Você deseja realmente deletar esse Estoque?"
                    onConfirmPress={() => deleteEstoque(String(selectedEstoque?.id!))}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "updating" && (
                <UpdateEstoqueModal
                    selectedEstoque={selectedEstoque!}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "adding" && (
                <AddEstoqueModal
                    onClose={() => setModal(undefined)}
                />
            )}
            <EstoqueList
                onDeleteClick={onDeleteClick}
                onUpdateClick={onUpdateClick}
            />
            <BottomButton text="Cadastrar novo Estoque +" onClick={() => setModal("adding")} />
        </div>
    );
}
