export interface UpdateProductReq {
    id: string,
    nome: string,
    marca: string,
    categoriaId: number,
    preco: number,
    codigo: number
}