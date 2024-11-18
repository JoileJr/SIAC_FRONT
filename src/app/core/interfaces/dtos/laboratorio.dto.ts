import { EnderecoDTO } from './endereco.dto';

export class LaboratorioDTO {
  id?: number;
  nome!: string;
  cnpj!: string;
  telefone!: string;
  razaoSocial!: string;
  email!: string;
  endereco?: EnderecoDTO;
}
