import { Modal } from "@/components/UI/modal";
import React, { useEffect, useState } from "react";
import { X } from "../../../../../public/svg/X";
import { Input } from "@/components/UI/input";
import { ProductItem } from "@/@types/interfaces/Product";
import { createProduct, getCategories } from "@/service/productsHttp";
import { CategoriesDropdown } from "../updateProductModal/categoriesDropdown";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CreateProductReq } from "@/@types/interfaces/req/CreateProductReq";
import { Category } from "@/@types/interfaces/Category";

interface AddProductFields {
    nome: string,
    codigo: string,
    marca: string,
    preco: number,
    categoriaId: number
}

export default function AddProductModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        async function fetchCategories() {
            const categories = await getCategories();
            setCategories(categories);
        }
        fetchCategories();
    }, []);

    const { control, handleSubmit } = useForm<AddProductFields>({
        defaultValues: {
            nome: "",
            marca: "",
            preco: 0,
            codigo: "",
            categoriaId: 0
        },
    });

    const onSubmit: SubmitHandler<AddProductFields> = (data) => {
        console.log(data);
        const nProduct: CreateProductReq = { ...data, cod: data.codigo };
        createProduct(nProduct);
        onClose();
    }

    return (
        <Modal
            onClose={onClose}
            className="bg-orange-400 p-8 rounded-xl w-[960px] flex flex-col"
        >
            <div className="flex justify-between w-full">
                <h1 className="mx-auto text-3xl font-bold text-white">
                    Cadastrar Produto
                </h1>
                <button onClick={onClose}>
                    <X />
                </button>
            </div>
            <form className="flex flex-col w-full gap-8 pt-16" onSubmit={handleSubmit(onSubmit)}>
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
                        name="codigo"
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
                        rules={{ required: true, pattern: /[^0-9]+/g }}
                        render={({ field, fieldState }) => <Input
                            label="Preço do produto"
                            id="preco"
                            invalid={!!fieldState.error}
                            {...field}
                        />}
                    />
                </div>
                <Controller
                    name="categoriaId"
                    control={control}
                    render={({ field, fieldState }) => <CategoriesDropdown categories={categories} />}
                />
                <button className="p-4 text-xl font-bold text-white bg-orange-500 rounded-xl hover:bg-orange-600 self-end">
                    Confirmar atualização
                </button>
            </form>
        </Modal>
    );
}
