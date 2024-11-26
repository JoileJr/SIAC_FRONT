import { LaboratorioDTO } from "../dtos/laboratorio.dto";

export class ProfissionalSaudeRequest {
    id?: number;
    nome!: string;
    cpf!: string;
    telefone!: string;
    sexo!: string;
    email!: string;
    senha?: string;
    dataNascimento!: Date;
    perfis!: string;
    registroProfissional!: string;
    tipoProfissional!: string;
    regiao?: string | null;
    laboratorio?: LaboratorioDTO;
  }
