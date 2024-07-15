import { Endereco } from "./Endereco";

export interface Cliente {
    id: number,
    nome: string,
    cpf: string,
    endereco: Endereco,
    dataDeNascimento: string,
    sexo: "FEMININO" | "MASCULINO"
}
