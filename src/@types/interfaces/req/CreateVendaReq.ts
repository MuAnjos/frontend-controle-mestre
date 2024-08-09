import { ProductItem } from "../Product"

export interface CreateVendaReq {
  id?: string,
  valor: number,
  quantidade: number,
  produtosId: (string | null)[]
  funcionarioId: string,
  clienteId: string
}