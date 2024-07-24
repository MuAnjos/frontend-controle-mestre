import { Endereco } from "../Endereco";

export interface UpdateClienteReq {
    id: number,
    nome: string,
    cpf: string,
    endereco: Endereco | undefined,
    dataNascimento: string,
    sexo: "FEMININO" | "MASCULINO"
}