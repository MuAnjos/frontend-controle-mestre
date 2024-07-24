import React, { useState } from 'react'
import { Cliente } from '@/@types/interfaces/Cliente';
import { ClienteForm, ClienteFormFields } from '../clienteForm';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { updateCliente } from '@/service/clientesHttp';
import { MessageModal } from '@/components/UI/messageModal';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { UpdateClienteReq } from '@/@types/interfaces/req/UpdateClienteReq';
import { getClienteDataNascimento } from '@/util/formatter/dateFormatter';

export function UpdateClienteModal({
    selectedCliente,
    onClose,
}: {
    selectedCliente: Cliente;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register, getValues, setValue } = useForm<ClienteFormFields>({
        defaultValues: {
            nome: selectedCliente.nome,
            cpf: selectedCliente.cpf,
            sexo: selectedCliente.sexo,
            dataNascimento: getClienteDataNascimento(selectedCliente.dataNascimento),
            endereco: selectedCliente.endereco
        },
    });

    const onSubmit: FormSubmitHandler<ClienteFormFields> = async ({ data }) => {
        const enderecoCliente = data.endereco ? { ...data.endereco, id: selectedCliente.id! } : undefined;
        const updatedCliente: UpdateClienteReq = {
            id: selectedCliente.id,
            nome: data.nome,
            cpf: data.cpf,
            sexo: data.sexo,
            dataNascimento: data.dataNascimento.toISOString().split("T")[0],
            endereco: enderecoCliente
        }
        const response = await updateCliente(updatedCliente);
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
                <ModalHeader title="Atualizar Cliente" onClose={onClose} />
                <ClienteForm
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