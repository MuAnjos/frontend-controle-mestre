import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CategoryForm, CategoryFormFields } from "../categoryForm";
import { createCategory } from "@/service/categoriesHttp";
import { Category } from "@/@types/interfaces/Category";

export function AddCategoryModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control } = useForm<CategoryFormFields>({
        defaultValues: {
            nome: "",
        },
    });

    const onSubmit: FormSubmitHandler<CategoryFormFields> = async ({ data }) => {
        const nCategory: Category = { ...data, id: undefined };
        const response = await createCategory(nCategory);
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
                <ModalHeader
                    onClose={onClose}
                    title="Cadastrar produto"
                />
                <CategoryForm
                    onSubmit={onSubmit}
                    control={control}
                />
            </Modal>}
        </>
    );
}
