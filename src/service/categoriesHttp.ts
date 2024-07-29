import { Category } from "@/@types/interfaces/Category";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createCategory(newCategory: Category) {
    const response = await fetch("http://localhost:8080/categoria", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newCategory }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    return { error: false, message: "Categoria criada com sucesso!" };
}

export async function deleteCategory(categoryId: string) {
    const response = await fetch(
        `http://localhost:8080/categoria/${categoryId}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar o Cliente", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    return { error: false, message: "Categoria deletada com sucesso!" };
}

export async function updateCategory(updatedCategory: Category) {
    const response = await fetch("http://localhost:8080/categoria", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    return { error: false, message: "Categoria atualizada com sucesso!" };
}

export async function getCategories() {
    const response = await fetch("http://localhost:8080/categoria");
    const data = await response.json();
    return data;
}

