export class PessoaDTO {
  id?: number;

  nome!: string;

  cpf!: string;

  telefone!: string;

  sexo!: string;

  email!: string;

  senha?: string;

  dataNascimento!: string;

  perfis?: any;

  convenios?: any[];

  prontuarios?: any[];

  examesRealizados?: any[];
}
