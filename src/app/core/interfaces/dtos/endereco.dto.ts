export class EnderecoDTO {
  id?: number;
  cep!: string;
  estado!: string;
  cidade!: string;
  bairro!: string;
  logradouro!: string;
  numero!: string;
  complemento?: string;
}
