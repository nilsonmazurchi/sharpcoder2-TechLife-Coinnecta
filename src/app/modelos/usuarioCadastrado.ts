export class usuarioCadastrado {
  id: string | null;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  diaNascimento: Date;
  endereco: {
    cep: string;
    logradouro: string;
    complemento: string;
    pontoRef: string;
    uf: string;
    numero: number;
  };
  senha: string;

  constructor(
    id: string | null,
    nome: string,
    telefone: string,
    email: string,
    cpf: string,
    diaNascimento: Date,
    endereco: {
      cep: string;
      logradouro: string;
      complemento: string;
      pontoRef: string;
      uf: string;
      numero: number;
    },
    senha: string
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.cpf = cpf;
    this.diaNascimento = diaNascimento;
    this.endereco = endereco;
    this.senha = senha;
  }
}
