import { CreateClienteReq } from "@/@types/interfaces/req/CreateClienteReq";
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
