export interface ItemVenda {
  id: string,
  valor: number,
  quantidade: number,
  funcionario: {
    id: string,
    nome: string
  },
  cliente: {
    id: string,
    nome: string
  },
}