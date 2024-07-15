export interface CreateClienteReq {
    nome: string,
    cpf: string,
    endereco: {
        cidade: string,
        cep: number,
        numero: number,
        rua: string,
        bairro: string,
        complemento?: string
    },
    dataDeNascimento: string,
    sexo: string
}