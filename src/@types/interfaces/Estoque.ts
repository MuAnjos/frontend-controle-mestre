import { ProductItem } from "./Product";

export interface Estoque {
    id: number;
    nome: string;
    produto: ProductItem;
    quantidade: number;
}