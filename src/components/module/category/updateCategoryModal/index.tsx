import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CategoryForm, CategoryFormFields } from "../categoryForm";
import { Category } from "@/@types/interfaces/Category";
import { updateCategory } from "@/service/categoriesHttp";

export default function UpdateCategoryModal({
    selectedCategory,
    onClose,
}: {
    selectedCategory: Category;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control } = useForm<CategoryFormFields>({
        defaultValues: {
            nome: selectedCategory.nome,
        },
    });

    const onSubmit: FormSubmitHandler<CategoryFormFields> = async ({ data }) => {
        const updatedCategory: Category = {
            id: +selectedCategory.id!,
            nome: data.nome,
        }
        const response = await updateCategory(updatedCategory);
        setStatus(response);
    }

    return (
        <>
            {status && <MessageModal
                message={status.message}
                icon={status.error ? "/img/error.png" : "/img/check.png"}
                onClose={status.error ? () => setStatus(undefined) : onClose}
            />}
            {!status && <Modal
                onClose={onClose}
                className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col"
            >
                <ModalHeader title="Atualizar Categoria" onClose={onClose} />
                <CategoryForm
                    onSubmit={onSubmit}
                    control={control}
                />
            </Modal>}
        </>
    );
}