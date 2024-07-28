import React from 'react';
import { Control, Controller, Form, FormSubmitHandler, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Input } from '@/components/UI/input';
import { ProductsDropdown } from './productsDropdown';
import { QuantityPicker } from './quantityPicker';

export interface EstoqueFormFields {
    nome: string;
    quantidade: number;
    productId: number;
}

interface EstoqueFormProps {
    quantity: number;
    control: Control<EstoqueFormFields, any> | undefined,
    onSubmit: FormSubmitHandler<EstoqueFormFields>,
    register: UseFormRegister<EstoqueFormFields>
    setValue: UseFormSetValue<EstoqueFormFields>;
    update?: boolean,
}

export function EstoqueForm({ update, control, quantity, setValue, register, onSubmit }: EstoqueFormProps) {
    return <>
        <Form className="flex flex-col w-full gap-4 pt-4" onSubmit={onSubmit} control={control}>
            <div className="flex w-full gap-4">
                <Controller
                    name="nome"
                    control={control}
                    rules={{ required: true, minLength: 3 }}
                    render={({ field, fieldState }) => <Input
                        label="Nome do estoque"
                        id="nome"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
                <Controller
                    name="productId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <ProductsDropdown
                        label="Produto"
                        id="productId"
                        required
                        register={register}
                        {...field}
                    />}
                />
            </div>
            <div className="flex justify-between w-full gap-4">
                <Controller
                    name="quantidade"
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field }) => <QuantityPicker
                        register={register}
                        setValue={setValue}
                        quantityValue={quantity}
                        {...field}
                    />}
                />
            </div>
            <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                Confirmar {update ? "atualização" : "Cadastro"}
            </button>
        </Form>
    </>
}
