import { Form, Controller, FormSubmitHandler, Control } from "react-hook-form";
import { Input } from "@/components/UI/input";

export interface CategoryFormFields {
    nome: string,
}

interface CategoryFormProps {
    update?: boolean,
    onSubmit: FormSubmitHandler<CategoryFormFields>,
    control: Control<CategoryFormFields, any> | undefined,
}

export function CategoryForm({ update, control, onSubmit }: CategoryFormProps) {
    return <>
        <Form className="flex flex-col w-full gap-8 pt-16" onSubmit={onSubmit} control={control}>
            <div className="flex w-full gap-4">
                <Controller
                    name="nome"
                    control={control}
                    rules={{ required: true, minLength: 3 }}
                    render={({ field, fieldState }) => <Input
                        label="Nome da categoria"
                        id="nome"
                        invalid={!!fieldState.error}
                        required
                        {...field}
                    />}
                />
            </div>
            <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                Confirmar {update ? "Atualização" : "Criação"}
            </button>
        </Form>
    </>
}