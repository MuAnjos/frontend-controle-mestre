import { ProductItem } from "../Product"

export interface CreateVendaReq {
  id?: string,
  valor: number,
  quantidade: number,
  produtos: ProductItem[]
  funcionarioId: string,
  clienteId: string
}