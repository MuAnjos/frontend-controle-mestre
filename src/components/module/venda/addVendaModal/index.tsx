import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { VendaForm, VendaFormFields } from "../vendaForm";
import { CreateVendaReq } from "@/@types/interfaces/req/CreateVendaReq";
import { createVenda } from "@/service/vendaHttp";

export default function AddVendaModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register } = useForm<VendaFormFields>();

    const onSubmit: FormSubmitHandler<VendaFormFields> = async ({ data }) => {
        const nProduct: CreateVendaReq = {
            ...data,
            quantidade: data.produtos.length,
            valor: 0
        };
        const response = await createVenda(nProduct);
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
                <VendaForm onSubmit={onSubmit} control={control} register={register} />
            </Modal>}
        </>
    );
}
