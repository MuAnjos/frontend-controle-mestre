import { Endereco } from "../Endereco";

export interface UpdateClienteReq {
    id: number,
    nome: string,
    cpf: string,
    endereco: Endereco,
    dataDeNascimento: string,
    sexo: "FEMININO" | "MASCULINO"
}