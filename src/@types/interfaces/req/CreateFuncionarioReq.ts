import { Endereco } from "../Endereco";
import { Cargo } from "../Funcionario";

export interface CreateFuncionarioReq {
    nome: string,
    apelido: string,
    cpf: string,
    endereco: Endereco | undefined,
    email: string,
    telefone: string,
    cargo: Cargo
}