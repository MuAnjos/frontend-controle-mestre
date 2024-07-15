import { Endereco } from "../Endereco";

export interface CreateClienteReq {
    nome: string,
    cpf: string,
    endereco: Endereco,
    dataDeNascimento: string,
    sexo: string
}