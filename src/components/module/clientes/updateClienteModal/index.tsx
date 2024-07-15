import React, { useState } from 'react'
import { Cliente } from '@/@types/interfaces/Cliente';
import { ClienteForm, ClienteFormFields } from '../clienteForm';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { updateCliente } from '@/service/clientesHttp';
import { MessageModal } from '@/components/UI/messageModal';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { ISOFormatter } from '@/util/formatter/dateFormatter';
import { UpdateClienteReq } from '@/@types/interfaces/req/UpdateClienteReq';

export function UpdateClienteModal({
    selectedCliente,
    onClose,
}: {
    selectedCliente: Cliente;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register } = useForm<ClienteFormFields>({
        defaultValues: {
            nome: selectedCliente.nome,
            cpf: selectedCliente.cpf,
            dataNascimento: new Date(selectedCliente.dataNascimento),
            numero: selectedCliente.endereco.numero.toString(),
            cidade: selectedCliente.endereco.cidade,
            cep: selectedCliente.endereco.cep.toString(),
            rua: selectedCliente.endereco.rua,
            bairro: selectedCliente.endereco.bairro,
            sexo: selectedCliente.sexo
        },
    });

    const onSubmit: FormSubmitHandler<ClienteFormFields> = async ({ data }) => {
        const updatedCliente: UpdateClienteReq = {
            id: selectedCliente.id!,
            nome: data.nome,
            cpf: data.cpf,
            dataNascimento: ISOFormatter(data.dataNascimento.toLocaleDateString().replaceAll("/", "-")),
            endereco: {
                id: selectedCliente.endereco.id,
                numero: +data.numero,
                cidade: data.cidade,
                cep: +data.cep,
                rua: data.rua,
                bairro: data.bairro
            },
            sexo: data.sexo
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
                <ClienteForm onSubmit={onSubmit} control={control} register={register} update />
            </Modal>}
        </>
    );
}