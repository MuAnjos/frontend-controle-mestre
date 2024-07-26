import React, { useState } from 'react'
import { Fornecedor } from '@/@types/interfaces/Fornecedor';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { MessageModal } from '@/components/UI/messageModal';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { FornecedorForm, FornecedorFormFields } from '../fornecedorForm';
import { updateFornecedor } from '@/service/fornecedorHttp';

export function UpdateFornecedorModal({
    selectedFornecedor,
    onClose,
}: {
    selectedFornecedor: Fornecedor;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, getValues, setValue } = useForm<FornecedorFormFields>({
        defaultValues: {
            nome: selectedFornecedor.nome,
            telefone: selectedFornecedor.telefone,
            cnpj: selectedFornecedor.cnpj,
            email: selectedFornecedor.email,
            endereco: selectedFornecedor.endereco
        },
    });

    const onSubmit: FormSubmitHandler<FornecedorFormFields> = async ({ data }) => {
        const enderecoFornecedor = data.endereco ? { ...data.endereco, id: selectedFornecedor.id! } : undefined;
        const updatedFornecedor: Fornecedor = {
            id: selectedFornecedor.id,
            nome: data.nome,
            telefone: data.telefone,
            cnpj: data.cnpj,
            email: data.email,
            endereco: enderecoFornecedor
        }
        const response = await updateFornecedor(updatedFornecedor);
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
                <ModalHeader title="Atualizar Fornecedor" onClose={onClose} />
                <FornecedorForm
                    onSubmit={onSubmit}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    update
                />
            </Modal>}
        </>
    );
}