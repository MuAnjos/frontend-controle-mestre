import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { EstoqueForm, EstoqueFormFields } from "../estoqueForm";
import { CreateEstoqueReq } from "@/@types/interfaces/req/CreateEstoqueReq";
import { createEstoque } from "@/service/estoqueHttp";

export default function AddProductModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register, getValues, setValue } = useForm<EstoqueFormFields>({
        defaultValues: {
            nome: "",
            quantidade: 0,
        },
    });

    const onSubmit: FormSubmitHandler<EstoqueFormFields> = async ({ data }) => {
        const nEstoque: CreateEstoqueReq = {
            ...data,
            produtoId: data.productId
        };
        const response = await createEstoque(nEstoque);
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
                <EstoqueForm
                    onSubmit={onSubmit}
                    control={control}
                    register={register}
                    quantity={getValues("quantidade")}
                    setValue={setValue}
                />
            </Modal>}
        </>
    );
}
