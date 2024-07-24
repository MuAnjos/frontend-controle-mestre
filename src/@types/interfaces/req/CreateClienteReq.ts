export interface CreateClienteReq {
    nome: string,
    cpf: string,
    endereco: {
        cidade: string,
        cep: string,
        numero: string,
        rua: string,
        bairro: string,
        complemento?: string
    } | undefined,
    dataNascimento: string,
    sexo: string
}