import { Endereco } from "./Endereco";

export interface Funcionario {
    id: string;
    nome: string;
    apelido: string;
    cpf: string;
    endereco: Endereco | undefined;
    email: string;
    telefone: string;
    cargo: Cargo
}

export type Cargo = "GERENTE" | "ATENDENTE";