import { Fornecedor } from "@/@types/interfaces/Fornecedor";
import { CreateFornecedorReq } from "@/@types/interfaces/req/CreateFornecedor";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createFornecedor(newFornecedor: CreateFornecedorReq) {
    const response = await fetch("http://localhost:8080/fornecedor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newFornecedor }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    return { error: false, message: "Fornecedor criado com sucesso!" };
}

export async function getFornecedores() {
    const response = await fetch("http://localhost:8080/fornecedor");
    const data = await response.json();
    return data;
}

export async function deleteFornecedor(selectedFornecedor: string) {
    const response = await fetch(
        `http://localhost:8080/fornecedor/${selectedFornecedor}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar o Fornecedor", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    return { error: false, message: "Fornecedor deletado com sucesso!" };
}

export async function updateFornecedor(updatedFornecedor: Fornecedor) {
    const response = await fetch("http://localhost:8080/fornecedor", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFornecedor),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
    return { error: false, message: "Fornecedor atualizado com sucesso!" };
}
