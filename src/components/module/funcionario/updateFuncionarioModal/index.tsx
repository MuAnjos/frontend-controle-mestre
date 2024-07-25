import React, { useState } from 'react';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { MessageModal } from '@/components/UI/messageModal';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { Funcionario } from '@/@types/interfaces/Funcionario';
import { FuncionarioForm, FuncionarioFormFields } from '../funcionarioForm';
import { updateFuncionario } from '@/service/funcionarioHttp';

export function UpdateFuncionarioModal({
    selectedFuncionario,
    onClose,
}: {
    selectedFuncionario: Funcionario;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register, getValues, setValue } = useForm<FuncionarioFormFields>({
        defaultValues: {
            nome: selectedFuncionario.nome,
            cpf: selectedFuncionario.cpf,
            apelido: selectedFuncionario.apelido,
            endereco: selectedFuncionario.endereco,
            telefone: selectedFuncionario.telefone,
            cargo: selectedFuncionario.cargo,
            email: selectedFuncionario.email
        },
    });

    const onSubmit: FormSubmitHandler<FuncionarioFormFields> = async ({ data }) => {
        const enderecoFuncionario = data.endereco ? { ...data.endereco, id: Number(selectedFuncionario.id!) } : undefined;
        const updatedFuncionario: Funcionario = {
            id: selectedFuncionario.id,
            nome: data.nome,
            cpf: data.cpf,
            apelido: data.apelido,
            cargo: data.cargo,
            email: data.email,
            telefone: data.telefone,
            endereco: enderecoFuncionario
        }
        const response = await updateFuncionario(updatedFuncionario);
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
                <ModalHeader title="Atualizar Funcionário" onClose={onClose} />
                <FuncionarioForm
                    onSubmit={onSubmit}
                    control={control}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    update
                />
            </Modal>}
        </>
    );
}