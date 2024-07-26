"use client";

import React, { useState } from 'react'
import { Fornecedor } from '@/@types/interfaces/Fornecedor';
import { BottomButton } from '@/components/UI/bottomButton';
import { DeleteModal } from '@/components/UI/deleteModal';
import { deleteFornecedor } from '@/service/fornecedorHttp';
import AddFornecedorModal from '@/components/module/fornecedores/addFornecedorModal';
import { UpdateFornecedorModal } from '@/components/module/fornecedores/updateFornecedorModal';
import { FornecedorList } from '@/components/module/fornecedores/fornecedorList';

export default function Fornecedores() {
    const [selectedFornecedor, setSelectedFornecedor] = useState<Fornecedor>();
    const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

    function onDeleteClick(Fornecedor: Fornecedor) {
        setSelectedFornecedor(Fornecedor);
        setModal("removing");
    }

    function onUpdateClick(Fornecedor: Fornecedor) {
        setModal("updating");
        setSelectedFornecedor(Fornecedor);
    }

    return (
        <div className="flex flex-col pt-5">
            {modal === "removing" && (
                <DeleteModal
                    message="Você deseja realmente deletar esse funcionário?"
                    onConfirmPress={() => deleteFornecedor(String(selectedFornecedor?.id!))}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "updating" && (
                <UpdateFornecedorModal
                    selectedFornecedor={selectedFornecedor!}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "adding" && (
                <AddFornecedorModal
                    onClose={() => setModal(undefined)}
                />
            )}
            <FornecedorList
                onDeleteClick={onDeleteClick}
                onUpdateClick={onUpdateClick}
            />
            <BottomButton text="Cadastrar novo Fornecedor +" onClick={() => setModal("adding")} />
        </div>
    );
}
