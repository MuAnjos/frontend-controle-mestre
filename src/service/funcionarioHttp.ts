import { Funcionario } from "@/@types/interfaces/Funcionario";
import { CreateFuncionarioReq } from "@/@types/interfaces/req/CreateFuncionarioReq";
import { queryClient } from "@/components/utils/reactQueryProvider";

export async function createFuncionario(newFuncionario: CreateFuncionarioReq) {
    const response = await fetch("http://localhost:8080/funcionario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newFuncionario }),
    });
    if (response.status !== 200) {
        const errorResponse = await response.text();
        const error = JSON.parse(errorResponse);
        return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    return { error: false, message: "Funcionario criado com sucesso!" };
}

export async function getFuncionarios() {
    const response = await fetch("http://localhost:8080/funcionario");
    const data = await response.json();
    return data;
}

export async function deleteFuncionario(selectedFuncionario: string) {
    const response = await fetch(
        `http://localhost:8080/funcionario/${selectedFuncionario}`,
        {
            method: "DELETE",
        }
    );
    if (response.status !== 200) {
        return { message: "Ocorreu um erro ao deletar o funcionario", error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    return { error: false, message: "Funcionario deletado com sucesso!" };
}

export async function updateFuncionario(updatedFuncionario: Funcionario) {
    const response = await fetch("http://localhost:8080/funcionario", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFuncionario),
    });
    if (response.status !== 200) {
      const errorResponse = await response.text();
      const error = JSON.parse(errorResponse);
      return { message: error.message, error: true };
    }
    queryClient.invalidateQueries({ queryKey: ["funcionarios"] });
    return { error: false, message: "Funcionário atualizado com sucesso!" };
  }
  