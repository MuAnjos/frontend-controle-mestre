import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { createProduct } from "@/service/productsHttp";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { CreateProductReq } from "@/@types/interfaces/req/CreateProductReq";
import { ProductForm, ProductFormFields } from "../productForm";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";

export default function AddProductModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register } = useForm<ProductFormFields>({
        defaultValues: {
            nome: "",
            marca: "",
            preco: "",
            cod: "",
        },
    });

    const onSubmit: FormSubmitHandler<ProductFormFields> = async ({ data }) => {
        const nProduct: CreateProductReq = { ...data };
        const response = await createProduct(nProduct);
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
                <ModalHeader onClose={onClose} title="Cadastrar produto" />
                <ProductForm onSubmit={onSubmit} control={control} register={register} />
            </Modal>}
        </>
    );
}
