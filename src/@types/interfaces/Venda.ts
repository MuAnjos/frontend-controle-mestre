import { ProductItem } from "./Product"

export interface ItemVenda {
  id: string,
  valor: number,
  quantidade: number,
  createdAt: Date,
  updatedAt: Date,
  produtos: ProductItem[]
  funcionario: {
    id: string,
    nome: string
  },
  cliente: {
    id: string,
    nome: string
  },
}