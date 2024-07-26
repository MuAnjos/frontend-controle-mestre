import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { FornecedorForm, FornecedorFormFields } from "../fornecedorForm";
import { CreateFornecedorReq } from "@/@types/interfaces/req/CreateFornecedor";
import { createFornecedor } from "@/service/fornecedorHttp";

export default function AddFuncionarioModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, getValues, setValue } = useForm<FornecedorFormFields>({
        defaultValues: {
            nome: "",
            cnpj: "",
            telefone: "",
            email: "",
            endereco: undefined
        },
    });

    const onSubmit: FormSubmitHandler<FornecedorFormFields> = async ({ data }) => {
        const enderecoFornecedor = data.endereco ? { ...data.endereco } : undefined;
        const nFornecedor: CreateFornecedorReq = {
            nome: data.nome,
            cnpj: data.cnpj,
            telefone: data.telefone,
            email: data.email,
            endereco: enderecoFornecedor,
        };
        const response = await createFornecedor(nFornecedor);
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
                <ModalHeader title="Cadastrar Fornecedor" onClose={onClose} />
                <FornecedorForm
                    onSubmit={onSubmit}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                />
            </Modal>}
        </>
    );
}
