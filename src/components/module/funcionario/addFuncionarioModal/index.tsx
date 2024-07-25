import React, { useState } from "react";
import { Modal } from "@/components/UI/modal";
import { FormSubmitHandler, useForm } from "react-hook-form";
import { MessageModal } from "@/components/UI/messageModal";
import { ModalHeader } from "@/components/UI/modalHeader";
import { CreateFuncionarioReq } from "@/@types/interfaces/req/CreateFuncionarioReq";
import { FuncionarioForm, FuncionarioFormFields } from "../funcionarioForm";
import { createFuncionario } from "@/service/funcionarioHttp";

export default function AddFuncionarioModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register, getValues, setValue } = useForm<FuncionarioFormFields>({
        defaultValues: {
            nome: "",
            cpf: "",
            endereco: undefined,
            apelido: "",
            cargo: "ATENDENTE",
            email: "",
            telefone: "",
        },
    });

    const onSubmit: FormSubmitHandler<FuncionarioFormFields> = async ({ data }) => {
        const enderecoFuncionario = data.endereco ? { ...data.endereco } : undefined;
        const nFuncionario: CreateFuncionarioReq = {
            nome: data.nome,
            cpf: data.cpf,
            endereco: enderecoFuncionario,
            apelido: data.apelido,
            cargo: data.cargo,
            email: data.email,
            telefone: data.telefone
        };
        const response = await createFuncionario(nFuncionario);
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
                <ModalHeader title="Cadastrar Funcionário" onClose={onClose} />
                <FuncionarioForm
                    onSubmit={onSubmit}
                    control={control}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                />
            </Modal>}
        </>
    );
}
