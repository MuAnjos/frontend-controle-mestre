import { Endereco } from "./Endereco";

export interface Fornecedor {
    id: number;
    nome: string;
    email: string;
    cnpj: string;
    endereco: Endereco | undefined;
    telefone: string;
}