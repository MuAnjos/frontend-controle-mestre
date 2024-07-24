import React, { useState } from 'react';
import { Control, Controller, Form, FormSubmitHandler, useForm, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/UI/input';
import { CDatePicker } from '../../../UI/datepicker';
import { SexRadio } from '@/components/UI/sexRadio';
import { AddressForm, AddressFormField } from './addressForm';
import { Endereco } from '@/@types/interfaces/Endereco';
import { AddressCard } from './addressCard';

export interface ClienteFormFields {
    nome: string,
    cpf: string,
    dataNascimento: Date,
    endereco: Endereco
    sexo: "MASCULINO" | "FEMININO",
}

interface ClienteFormProps {
    control: Control<ClienteFormFields, any> | undefined,
    getValues: UseFormGetValues<ClienteFormFields>,
    setValue: UseFormSetValue<ClienteFormFields>,
    onSubmit: FormSubmitHandler<ClienteFormFields>,
    register: UseFormRegister<ClienteFormFields>
    update?: boolean,
}

export function ClienteForm({ update, control, getValues, setValue, onSubmit, register }: ClienteFormProps) {
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
                        label="Nome do Cliente"
                        id="nome"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
                <Controller
                    name="cpf"
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    render={({ field, fieldState }) => <Input
                        label="CPF"
                        id="cpf"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
            </div>
            <div className="flex justify-between w-full gap-4">
                <Controller
                    name="dataNascimento"
                    control={control}
                    rules={{
                        required: true,
                        validate: (date) => 14 <= (new Date().getFullYear() - date.getFullYear())
                    }}
                    render={({ field, fieldState }) => <CDatePicker
                        id="dataDeNascimento"
                        label="Data de Nascimento"
                        required
                        selected={field.value}
                        invalid={!!fieldState.invalid}
                        register={register}
                        {...field}
                    />}
                />
                <Controller
                    name="sexo"
                    control={control}
                    rules={{ required: true }}
                    render={({ fieldState }) => <SexRadio
                        register={register}
                        invalid={!!fieldState.invalid}
                        required
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
