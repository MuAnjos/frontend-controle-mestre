import React from 'react';
import { Control, Controller, Form, FormSubmitHandler, UseFormRegister } from 'react-hook-form';
import { Input } from '@/components/UI/input';
import { CDatePicker } from '../../../UI/datepicker';
import { SexRadio } from '@/components/UI/sexRadio';

export interface ClienteFormFields {
    nome: string,
    cpf: string,
    cep: string,
    cidade: string,
    numero: string,
    rua: string,
    bairro: string,
    complemento: string,
    dataDeNascimento: Date,
    sexo: "MASCULINO" | "FEMININO"
}

interface ClienteFormProps {
    update?: boolean,
    control: Control<ClienteFormFields, any> | undefined,
    onSubmit: FormSubmitHandler<ClienteFormFields>,
    register: UseFormRegister<ClienteFormFields>
}

export function ClienteForm({ update, control, onSubmit, register }: ClienteFormProps) {
    return <Form className="flex flex-col w-full gap-4 pt-4" onSubmit={onSubmit} control={control}>
        <div className="flex w-full gap-4">
            <Controller
                name="nome"
                control={control}
                rules={{ required: true, minLength: 3 }}
                render={({ field, fieldState }) => <Input
                    label="Nome do Cliente"
                    id="nome"
                    invalid={!!fieldState.error}
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
                    {...field}
                />}
            />
        </div>
        <div className="flex justify-between w-full gap-4">
            <Controller
                name="cep"
                control={control}
                rules={{ required: true, minLength: 3 }}
                render={({ field, fieldState }) => <Input
                    label="CEP"
                    id="cep"
                    invalid={!!fieldState.error}
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
                    {...field}
                />}
            />
        </div>
        <div className="flex justify-between w-full gap-4">
            <Controller
                name="dataDeNascimento"
                control={control}
                rules={{
                    required: true,
                    validate: (date) => 14 <= (new Date().getFullYear() - date.getFullYear())
                }}
                render={({ field, fieldState }) => <CDatePicker
                    id="dataDeNascimento"
                    label="Data de Nascimento"
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
                render={({ field, fieldState }) => <SexRadio register={register} invalid={!!fieldState.invalid} />
                }
            />
        </div>
        <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
            Confirmar {update ? "atualização" : "Cadastro"}
        </button>
    </Form>
}
