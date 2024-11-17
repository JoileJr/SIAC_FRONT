export class SignUpRequest {

    id?: number;

    nome: string;

    cpf: string;

    telefone: string;

    sexo: string;

    email: string;

    senha: string;

    dataNascimento: Date;

    perfis: string;

    constructor(
      nome: string,
      cpf: string,
      telefone: string,
      sexo: string,
      email: string,
      senha: string,
      dataNascimento: Date,
      perfis: string
    ) {
      this.nome = nome;
      this.cpf = cpf;
      this.telefone = telefone;
      this.sexo = sexo;
      this.email = email;
      this.senha = senha;
      this.dataNascimento = dataNascimento;
      this.perfis = perfis;
    }
  }
