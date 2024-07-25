import React, { useState } from 'react';
import { Control, Controller, Form, FormSubmitHandler, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/UI/input';
import { AddressForm, AddressFormField } from '../../addressForm';
import { Endereco } from '@/@types/interfaces/Endereco';
import { AddressCard } from '../../addressCard';
import { Cargo } from '@/@types/interfaces/Funcionario';
import { CargoSelect } from '../cargoSelect';

export interface FuncionarioFormFields {
    nome: string,
    apelido: string,
    endereco: Endereco,
    cpf: string,
    email: string,
    telefone: string,
    cargo: Cargo
}

interface ClienteFormProps {
    control: Control<FuncionarioFormFields, any> | undefined,
    getValues: UseFormGetValues<FuncionarioFormFields>,
    setValue: UseFormSetValue<FuncionarioFormFields>,
    onSubmit: FormSubmitHandler<FuncionarioFormFields>,
    register: UseFormRegister<FuncionarioFormFields>
    update?: boolean,
}

export function FuncionarioForm({ update, control, getValues, setValue, onSubmit, register }: ClienteFormProps) {
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
                    name="apelido"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field, fieldState }) => <Input
                        id="apelido"
                        label="Apelido"
                        required
                        invalid={!!fieldState.invalid}
                        {...field}
                    />}
                />

            </div>
            <div className="flex justify-between w-full gap-4">
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
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ fieldState, field }) => <Input
                        invalid={!!fieldState.invalid}
                        required
                        label="Email"
                        id="email"
                        {...field}
                    />
                    }
                />
            </div>
            <div className="flex justify-between w-full gap-4">
                <Controller
                    name="telefone"
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    render={({ field, fieldState }) => <Input
                        label="Telefone"
                        id="telefone"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
                <Controller
                    name="cargo"
                    control={control}
                    rules={{ required: true }}
                    render={() => <CargoSelect
                        required
                        register={register}
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
