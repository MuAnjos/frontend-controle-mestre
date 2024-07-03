import { Category } from "./Category";

export interface ProductItem {
  id: string | null;
  nome: string;
  marca: string;
  categoria: Category;
  preco: string;
  codigo: string;
}
