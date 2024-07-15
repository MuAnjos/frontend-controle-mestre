export interface Endereco {
    id: number,
    cidade: string,
    cep: number,
    numero: number,
    rua: string,
    bairro: string,
    complemento?: string
}