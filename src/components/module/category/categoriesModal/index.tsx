import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CategoryList } from "../categoryList";
import { Category } from "@/@types/interfaces/Category";
import { DeleteModal } from "@/components/UI/deleteModal";
import { deleteCategory } from "@/service/categoriesHttp";
import { AddCategoryModal } from "../addCategoryModal";
import UpdateCategoryModal from "../updateCategoryModal";

export function CategoriesModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [selectedCategory, setSelectedCategory] = useState<Category>();
    const [modal, setModal] = useState<"adding" | "updating" | "removing">();
    const [status, setStatus] = useState<{ message: string; error: boolean }>();

    function onDeleteClick(category: Category) {
        setModal("removing");
        setSelectedCategory(category);
    }

    function onUpdateClick(category: Category) {
        setModal("updating");
        setSelectedCategory(category);
    }

    return (
        <>
            {modal === "adding" && (
                <AddCategoryModal
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "removing" && (
                <DeleteModal
                    message="Você deseja realmente deletar essa categoria ?"
                    onConfirmPress={() => deleteCategory(String(selectedCategory?.id!))}
                    onClose={() => setModal(undefined)}
                />
            )}
            {modal === "updating" && (
                <UpdateCategoryModal
                    selectedCategory={selectedCategory!}
                    onClose={() => setModal(undefined)}
                />
            )}
            {status && <MessageModal
                message={status.message}
                icon={status.error ? "/img/error.png" : "/img/check.png"}
                onClose={status.error ? () => setStatus(undefined) : onClose}
            />}
            {!status && <Modal
                onClose={onClose}
                className="bg-orange-400 p-8 rounded-xl w-[1060px] h-[480px] flex flex-col"
            >
                <ModalHeader onClose={onClose} title="Categorias" />
                <CategoryList
                    onAddClick={() => setModal("adding")}
                    onDeleteClick={onDeleteClick}
                    onUpdateClick={onUpdateClick}
                />
            </Modal>}
        </>
    );
}
