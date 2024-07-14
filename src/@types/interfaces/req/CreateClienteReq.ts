export interface CreateClienteReq {
    nome: string,
    cpf: string,
    endereco: {
        cep: number,
        numero: number,
        rua: string,
        bairro: string,
        complemento?: string 
    },
    dataDeNascimento: string,
    sexo: string
}