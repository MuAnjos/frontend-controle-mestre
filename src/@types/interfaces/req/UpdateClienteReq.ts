import { Endereco } from "../Endereco";

export interface UpdateClienteReq {
    id: number,
    nome: string,
    cpf: string,
    endereco: Endereco,
    dataNascimento: string,
    sexo: "FEMININO" | "MASCULINO"
}