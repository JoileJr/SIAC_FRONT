export class PessoaDTO {
  id?: number;

  nome!: string;

  cpf!: string;

  telefone!: string;

  sexo!: string;

  email!: string;

  senha?: string;

  dataNascimento!: Date;

  perfis?: any;
}
