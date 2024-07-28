import { CreateEstoqueReq } from "@/@types/interfaces/req/CreateEstoqueReq";
import { UpdateEstoqueReq } from "@/@types/interfaces/req/UpdateEstoqueReq";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createEstoque(newEstoque: CreateEstoqueReq) {
    console.log(newEstoque);
    const response = await fetch("http://localhost:8080/estoque", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newEstoque }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["estoques"] });
    return { error: false, message: "Estoque criado com sucesso!" };
}

export async function updateEstoque(updatedEstoque: UpdateEstoqueReq) {
    const response = await fetch("http://localhost:8080/estoque", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEstoque),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["estoques"] });
    return { error: false, message: "Estoque atualizado com sucesso!" };
}


export async function getEstoques() {
    const response = await fetch("http://localhost:8080/estoque");
    const data = await response.json();
    return data;
}

export async function deleteEstoque(estoqueId: string) {
    const response = await fetch(
        `http://localhost:8080/estoque/${estoqueId}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar o Estoque", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["estoques"] });
    return { error: false, message: "Estoque deletado com sucesso!" };
}