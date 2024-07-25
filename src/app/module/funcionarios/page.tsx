"use client";

import { Funcionario } from '@/@types/interfaces/Funcionario';
import AddFuncionarioModal from '@/components/module/funcionario/addFuncionarioModal';
import { FuncionarioList } from '@/components/module/funcionario/funcionarioList';
import { BottomButton } from '@/components/UI/bottomButton';
import { DeleteModal } from '@/components/UI/deleteModal';
import { deleteFuncionario } from '@/service/funcionarioHttp';
import React, { useState } from 'react'

export default function Funcionarios() {
    const [selectedFuncionario, setSelectedFuncionario] = useState<Funcionario>();
    const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

    function onDeleteClick(funcionario: Funcionario) {
        setSelectedFuncionario(funcionario);
        setModal("removing");
    }

    function onUpdateClick(funcionario: Funcionario) {
        setModal("updating");
        setSelectedFuncionario(funcionario);
    }

    return (
        <div className="flex flex-col pt-5">
            {modal === "removing" && (
                <DeleteModal
                    message="Você deseja realmente deletar esse produto?"
                    onConfirmPress={() => deleteFuncionario(selectedFuncionario?.id!)}
                    onClose={() => setModal(undefined)}
                />
            )}
            {/* {modal === "updating" && (
                <UpdateProductModal
                    selectedFuncionario={selectedFuncionario!}
                    onClose={() => setModal(undefined)}
                />
            )} */}
            {modal === "adding" && (
                <AddFuncionarioModal
                    onClose={() => setModal(undefined)}
                />
            )}
            <FuncionarioList
                onDeleteClick={onDeleteClick}
                onUpdateClick={onUpdateClick}
            />
            <BottomButton text="Cadastrar novo Funcionario +" onClick={() => setModal("adding")} />
        </div>
    );
}
