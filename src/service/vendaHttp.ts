import { CreateVendaReq } from "@/@types/interfaces/req/CreateVendaReq";
import { ItemVenda } from "@/@types/interfaces/Venda";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createVenda(newVenda: CreateVendaReq) {
    const response = await fetch("http://localhost:8080/vendas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newVenda }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["venda"] });
    return { error: false, message: "Venda criado com sucesso!" };
}

export async function getVendas() {
    const response = await fetch("http://localhost:8080/vendas");
    const data = await response.json();
    return data;
}
// A query precisa retornar a venda, o nome do cliente e o nome do funcionario


export async function deleteVenda(vendaId: string) {
    const response = await fetch(
        `http://localhost:8080/vendas/${vendaId}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar venda", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    return { error: false, message: "Venda deletado com sucesso!" };
}

export async function updateVenda(updateVenda: ItemVenda) {
    const response = await fetch("http://localhost:8080/funcionario", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateVenda),
    });
    if (response.status !== 200) {
      const errorResponse = await response.text();
      const error = JSON.parse(errorResponse);
      return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["venda"] });
    return { error: false, message: "Venda atualizado com sucesso!" };
  }
  