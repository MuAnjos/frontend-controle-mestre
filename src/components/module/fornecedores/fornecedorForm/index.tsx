import React, { useState } from 'react';
import { Control, Controller, Form, FormSubmitHandler, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/UI/input';
import { AddressForm, AddressFormField } from '../../addressForm';
import { Endereco } from '@/@types/interfaces/Endereco';
import { AddressCard } from '../../addressCard';

export interface FornecedorFormFields {
    nome: string;
    cnpj: string;
    endereco: Endereco;
    telefone: string;
    email: string;
}

interface FornecedorFormProps {
    control: Control<FornecedorFormFields, any> | undefined,
    getValues: UseFormGetValues<FornecedorFormFields>,
    setValue: UseFormSetValue<FornecedorFormFields>,
    onSubmit: FormSubmitHandler<FornecedorFormFields>,
    update?: boolean,
}

export function FornecedorForm({ update, control, getValues, setValue, onSubmit }: FornecedorFormProps) {
    const [showAddress, setShowAddress] = useState(false);
    const setEndereco: FormSubmitHandler<AddressFormField> = ({ data }) => {
        setValue("endereco", {
            ...data,
            id: undefined
        });
        setShowAddress(false);
    }
    return <>
        {showAddress && <AddressForm
            onClose={() => setShowAddress(false)}
            onSubmit={setEndereco}
            endereco={update ? getValues("endereco") : undefined}
        />}
        <Form className="flex flex-col w-full gap-4 pt-4" onSubmit={onSubmit} control={control}>
            <div className="flex w-full gap-4">
                <Controller
                    name="nome"
                    control={control}
                    rules={{ required: true, minLength: 3 }}
                    render={({ field, fieldState }) => <Input
                        label="Nome do Fornecedor"
                        id="nome"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
                <Controller
                    name="cnpj"
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    render={({ field, fieldState }) => <Input
                        label="CNPJ"
                        id="cnpj"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
            </div>
            <div className="flex justify-between w-full gap-4">
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field, fieldState }) => <Input
                        id="email"
                        label="Email"
                        invalid={!!fieldState.invalid}
                        required
                        {...field}
                    />}
                />
                <Controller
                    name="telefone"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => <Input
                        id="telefone"
                        label="Telefone"
                        invalid={!!fieldState.invalid}
                        required
                        {...field}
                    />
                    }
                />
            </div>
            <AddressCard endereco={getValues("endereco")} onClick={() => setShowAddress(true)} />
            <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                Confirmar {update ? "atualização" : "Cadastro"}
            </button>
        </Form>
    </>
}
