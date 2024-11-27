import { LaboratorioDTO } from "../dtos/laboratorio.dto";

export class FilterHealthProfessionalRequest {
    nome?: string;
    cpf?: string;
    email?: string;
    telefone?: string;
    registroProfissional?: string;
    tipoProfissional?: string;
    laboratorio?: LaboratorioDTO;
    dataInicio?: Date;
    dataFim?: Date;

    constructor(
      nome?: string | undefined,
      cpf?: string | undefined,
      email?: string | undefined,
      telefone?: string | undefined,
      registroProfissional?: string | undefined,
      tipoProfissional?: string | undefined,
      dataInicio?: Date | undefined,
      dataFim?: Date | undefined,
      laboratorio?: LaboratorioDTO | undefined
    ) {
      this.nome = nome;
      this.cpf = cpf;
      this.email = email;
      this.telefone = telefone;
      this.registroProfissional = registroProfissional;
      this.tipoProfissional = tipoProfissional;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
      this.laboratorio = laboratorio;
    }
}
