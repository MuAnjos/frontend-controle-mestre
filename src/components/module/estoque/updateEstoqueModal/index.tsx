import React, { useState } from 'react';
import { FormSubmitHandler, useForm } from 'react-hook-form';
import { MessageModal } from '@/components/UI/messageModal';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { EstoqueForm, EstoqueFormFields } from '../estoqueForm';
import { Estoque } from '@/@types/interfaces/Estoque';
import { UpdateEstoqueReq } from '@/@types/interfaces/req/UpdateEstoqueReq';
import { updateEstoque } from '@/service/estoqueHttp';

export function UpdateEstoqueModal({
    selectedEstoque,
    onClose,
}: {
    selectedEstoque: Estoque;
    onClose: () => void;
}) {
    const [status, setStatus] = useState<{ message: string; error: boolean }>();
    const { control, register, getValues, setValue } = useForm<EstoqueFormFields>({
        defaultValues: {
            nome: selectedEstoque.nome,
            productId: +selectedEstoque.produto.id!,
            quantidade: selectedEstoque.quantidade
        },
    });

    const onSubmit: FormSubmitHandler<EstoqueFormFields> = async ({ data }) => {
        const updatedFuncionario: UpdateEstoqueReq = {
            id: selectedEstoque.id,
            nome: data.nome,
            quantidade: data.quantidade,
            produtoId: data.productId
        }
        const response = await updateEstoque(updatedFuncionario);
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
                <ModalHeader title="Atualizar Estoque" onClose={onClose} />
                <EstoqueForm
                    onSubmit={onSubmit}
                    control={control}
                    register={register}
                    setValue={setValue}
                    quantity={getValues("quantidade")}
                    update
                />
            </Modal>}
        </>
    );
}