import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ClienteForm, ClienteFormFields } from "../clienteForm";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CreateClienteReq } from "@/@types/interfaces/req/CreateClienteReq";
import { createCliente } from "@/service/clientesHttp";

export default function AddClienteModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register } = useForm<ClienteFormFields>({
        defaultValues: {
            nome: "",
            bairro: "",
            rua: "",
            cpf: "",
            cep: "",
            numero: "",
            dataNascimento: new Date()
        },
    });

    const onSubmit: FormSubmitHandler<ClienteFormFields> = async ({ data }) => {
        const nCliente: CreateClienteReq = {
            nome: data.nome,
            cpf: data.cpf,
            sexo: data.sexo,
            dataNascimento: data.dataNascimento.toISOString().split("T")[0],
            endereco: {
                cidade: data.cidade,
                cep: parseInt(data.cep),
                numero: parseInt(data.numero),
                rua: data.rua,
                bairro: data.bairro,
                complemento: data.complemento
            },
        };
        const response = await createCliente(nCliente);
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
                <ModalHeader title="Cadastrar Cliente" onClose={onClose} />
                <ClienteForm onSubmit={onSubmit} control={control} register={register} />
            </Modal>}
        </>
    );
}
