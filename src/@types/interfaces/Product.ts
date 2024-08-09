import { Category } from './Category';

export interface ProductItem {
  id: string | null;
  nome: string;
  marca: string;
  Categoria: Category;
  preco: string;
  codigo: string;
}
