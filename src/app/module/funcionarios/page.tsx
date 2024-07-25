"use client";

import { ProductItem } from '@/@types/interfaces/Product';
import AddFuncionarioModal from '@/components/module/funcionario/addFuncionarioModal';
import { ProductList } from '@/components/module/product/productList';
import { BottomButton } from '@/components/UI/bottomButton';
import React, { useState } from 'react'

export default function Funcionarios() {
    const [selectedFuncionario, setSelectedFuncionario] = useState<ProductItem>();
    const [modal, setModal] = useState<"removing" | "adding" | "updating" | "success">();

    function onDeleteClick(item: ProductItem) {
        setSelectedFuncionario(item);
        setModal("removing");
    }

    function onUpdateClick(product: ProductItem) {
        setModal("updating");
        setSelectedFuncionario(product);
    }

    return (
        <div className="flex flex-col pt-5">
            {/* {modal === "removing" && (
                <DeleteModal
                    message="Você deseja realmente deletar esse produto?"
                    onConfirmPress={() => deleteProduct(selectedFuncionario?.id!)}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "updating" && (
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
            {/* <ProductList
                onDeleteClick={onDeleteClick}
                onUpdateClick={onUpdateClick}
            /> */}
            <BottomButton text="Cadastrar novo Funcionario +" onClick={() => setModal("adding")} />
        </div>
    );
}
