import { LaboratorioDTO } from "../dtos/laboratorio.dto";
import { TipoUsuario } from "../enums/TipoUsuario";

export class ProfissionalSaudeRequest {
    id?: number;

    nome!: string;
    cpf!: string;
    telefone!: string;
    sexo!: string;
    email!: string;
    senha!: string;
    dataNascimento!: Date;
    perfis!: string;
    registroProfissional!: string;
    tipoProfissional!: TipoUsuario;
    regiao!: string;
    laboratorio?: LaboratorioDTO;
  }
