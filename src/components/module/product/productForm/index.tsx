import { Form, Controller, FormSubmitHandler, Control, UseFormRegister } from "react-hook-form";
import { CategoriesDropdown } from "../categoriesDropdown";
import { Input } from "@/components/UI/input";

export interface ProductFormFields {
    nome: string,
    cod: string,
    marca: string,
    preco: string,
    categoriaId: number
}

interface ProductFormProps {
    update?: boolean,
    onSubmit: FormSubmitHandler<ProductFormFields>,
    control: Control<ProductFormFields, any> | undefined,
    register: UseFormRegister<ProductFormFields>
}

export function ProductForm({ update, control, onSubmit, register }: ProductFormProps) {
    return <>
        <Form className="flex flex-col w-full gap-8 pt-16" onSubmit={onSubmit} control={control}>
            <div className="flex w-full gap-4">
                <Controller
                    name="nome"
                    control={control}
                    rules={{ required: true, minLength: 3 }}
                    render={({ field, fieldState }) => <Input
                        label="Nome do produto"
                        id="nome"
                        invalid={!!fieldState.error}
                        {...field}
                    />}
                />
                <Controller
                    name="cod"
                    control={control}
                    rules={{ required: true, minLength: 6 }}
                    render={({ field, fieldState }) => <Input
                        label="Código do produto"
                        id="codigo"
                        invalid={!!fieldState.error}
                        {...field}
                    />}
                />
            </div>
            <div className="flex justify-between w-full gap-4">
                <Controller
                    name="marca"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => <Input
                        label="Marca do produto"
                        id="marca"
                        invalid={!!fieldState.error}
                        {...field}
                    />}
                />
                <Controller
                    name="preco"
                    control={control}
                    rules={{ required: true, pattern: /\d+\.?\d*/g }}
                    render={({ field, fieldState }) => <Input
                        label="Preço do produto"
                        id="preco"
                        invalid={!!fieldState.error}
                        {...field}
                    />}
                />
            </div>
            <CategoriesDropdown register={register} update={update} />
            <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                Confirmar {update ? "Atualização" : "Criação"}
            </button>
        </Form>
    </>
}