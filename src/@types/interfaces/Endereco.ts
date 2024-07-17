export interface Endereco {
    id: number | undefined,
    cidade: string,
    cep: string,
    numero: string,
    rua: string,
    bairro: string,
    complemento?: string
}