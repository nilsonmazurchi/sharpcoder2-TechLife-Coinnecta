import { tipoPessoa } from '../enum/tipoPessoa'
export class usuarioCadastrado {
  id: string | null;
  nome: string;
  telefone: string;
  email: string;
  cpf: string;
  cnpj: string;
  diaNascimento: Date;
  endereco: {
    cep: string;
    logradouro: string;
    complemento: string;
    pontoRef: string;
    uf: string;
    numero: number;
    bairro: string;
    cidade: string;

  };
  senha: string;
  tipoPessoa: tipoPessoa;

  constructor(
    id: string | null,
    nome: string,
    telefone: string,
    email: string,
    cpf: string,
    cnpj: string,
    diaNascimento: Date,
    endereco: {
      cep: string;
      logradouro: string;
      complemento: string;
      pontoRef: string;
      uf: string;
      numero: number;
      bairro: string;
      cidade: string;
    },
    senha: string,
    tipoPessoa: tipoPessoa
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.cpf = cpf;
    this.cnpj = cnpj;
    this.diaNascimento = diaNascimento;
    this.endereco = endereco;
    this.senha = senha;
    this.tipoPessoa = tipoPessoa;
  }
}
