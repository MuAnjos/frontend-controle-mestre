import { Category } from "./Category";

export interface ProductItem {
  id: string;
  nome: string;
  marca: string;
  categoria: Category;
  preco: string;
  codigo: string;
}
