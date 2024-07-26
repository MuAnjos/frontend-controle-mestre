import { Endereco } from "../Endereco";

export interface CreateFornecedorReq {
    nome: string;
    email: string;
    cnpj: string;
    endereco: Endereco | undefined;
    telefone: string;
}