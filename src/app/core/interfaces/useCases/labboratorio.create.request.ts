import { EnderecoDTO } from '../dtos/endereco.dto';

export class LaboratorioCreateRequest {
  id?: number;
  nome!: string;
  cnpj!: string;
  telefone!: string;
  razaoSocial!: string;
  email!: string;
  endereco?: EnderecoDTO;
  idAdm?: number;
}
