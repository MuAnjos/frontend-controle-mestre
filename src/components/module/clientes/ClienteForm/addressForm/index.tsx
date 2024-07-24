import React from 'react';
import { Input } from '@/components/UI/input';
import { Controller, Form, useForm } from 'react-hook-form';
import { Modal } from '@/components/UI/modal';
import { ModalHeader } from '@/components/UI/modalHeader';
import { Endereco } from '@/@types/interfaces/Endereco';

export interface AddressFormField {
    cidade: string,
    bairro: string,
    rua: string,
    cep: string,
    numero: string,
    complemento: string,
}

interface AddressFormProps {
    endereco: Endereco | undefined;
    onSubmit: (data: any) => void;
    onClose: () => void;
}

export function AddressForm({ endereco, onSubmit, onClose }: AddressFormProps) {
    const { control } = useForm<AddressFormField>({
        defaultValues: {
            cidade: endereco?.cidade ?? "",
            bairro: endereco?.bairro ?? "",
            rua: endereco?.rua ?? "",
            cep: endereco?.cep ?? "",
            numero: endereco?.numero ?? "",
            complemento: endereco?.complemento ?? ""
        },
    });
    return (
        <Modal onClose={onClose} className="bg-orange-400 p-8 rounded-xl w-[800px] flex flex-col">
            <ModalHeader title="Insira os dados do endereço" onClose={onClose} />
            <Form onSubmit={onSubmit} control={control} className="flex flex-col w-full gap-4 pt-4">
                <div className="flex justify-between w-full gap-4">
                    <Controller
                        name="cep"
                        control={control}
                        rules={{ required: true, minLength: 3 }}
                        render={({ field, fieldState }) => <Input
                            label="CEP"
                            id="cep"
                            invalid={!!fieldState.error}
                            required
                            {...field}
                        />}
                    />
                    <Controller
                        name="numero"
                        control={control}
                        rules={{ required: true, minLength: 1 }}
                        render={({ field, fieldState }) => <Input
                            label="Número da casa"
                            id="numero"
                            invalid={!!fieldState.error}
                            required
                            {...field}
                        />}
                    />
                </div>
                <div className="flex w-full gap-4">
                    <Controller
                        name="rua"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => <Input
                            label="Rua"
                            id="rua"
                            invalid={!!fieldState.error}
                            required
                            {...field}
                        />}
                    />
                    <Controller
                        name="bairro"
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => <Input
                            label="Bairro"
                            id="bairro"
                            invalid={!!fieldState.error}
                            required
                            {...field}
                        />}
                    />
                </div>
                <div className="flex justify-between w-full gap-4">
                    <Controller
                        name="complemento"
                        control={control}
                        rules={{ required: false }}
                        render={({ field, fieldState }) => <Input
                            label="Complemento"
                            id="complemento"
                            invalid={!!fieldState.error}
                            {...field}
                        />}
                    />
                    <Controller
                        name="cidade"
                        control={control}
                        rules={{
                            required: true,
                            minLength: 3
                        }}
                        render={({ field, fieldState }) => <Input
                            id="cidade"
                            label="Cidade"
                            invalid={!!fieldState.invalid}
                            required
                            {...field}
                        />}
                    />
                </div>
                <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                    Confirmar
                </button>
            </Form>
        </Modal>
    )
}
