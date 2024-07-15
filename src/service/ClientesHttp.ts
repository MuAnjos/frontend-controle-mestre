import { Cliente } from "@/@types/interfaces/Cliente";
import { CreateClienteReq } from "@/@types/interfaces/req/CreateClienteReq";
import { UpdateClienteReq } from "@/@types/interfaces/req/UpdateClienteReq";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createCliente(newCliente: CreateClienteReq) {
    const response = await fetch("http://localhost:8080/cliente", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newCliente }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["clientes"] });
    return { error: false, message: "Cliente criado com sucesso!" };
}

export async function updateCliente(updatedCliente: UpdateClienteReq) {    
    const response = await fetch("http://localhost:8080/cliente", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCliente),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["clientes"] });
    return { error: false, message: "Cliente atualizado com sucesso!" };
}


export async function getClientes() {
    const response = await fetch("http://localhost:8080/cliente");
    const data = await response.json();
    return data;
}

export async function deleteProduct(selectedProduct: string) {
    const response = await fetch(
        `http://localhost:8080/cliente/${selectedProduct}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar o Cliente", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["products"] });
    return { error: false, message: "Cliente deletado com sucesso!" };
}