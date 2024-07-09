import React from "react";
import { Modal } from "@/components/UI/modal";
import { createProduct } from "@/service/productsHttp";
import { X } from "../../../../../public/svg/X";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { CreateProductReq } from "@/@types/interfaces/req/CreateProductReq";
import { ProductForm, ProductFormFields } from "../productForm";

export default function AddProductModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const { control, register } = useForm<ProductFormFields>({
        defaultValues: {
            nome: "",
            marca: "",
            preco: "",
            cod: "",
        },
    });

    const onSubmit: FormSubmitHandler<ProductFormFields> = ({ data }) => {
        const nProduct: CreateProductReq = { ...data };
        console.log(nProduct);
        createProduct(nProduct);
        onClose();
    }

    return (
        <Modal
            onClose={onClose}
            className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col"
        >
            <div className="flex justify-between w-full">
                <h1 className="mx-auto text-3xl font-bold text-white">
                    Cadastrar Produto
                </h1>
                <button onClick={onClose}>
                    <X />
                </button>
            </div>
            <ProductForm onSubmit={onSubmit} control={control} register={register} />
        </Modal>
    );
}
