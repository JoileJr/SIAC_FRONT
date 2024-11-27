export class FilterPersonsRequest {
    nome?: string;
    cpf?: string;
    dataInicio?: Date;
    dataFim?: Date;

    constructor(
      nome?: string | undefined,
      cpf?: string | undefined,
      dataInicio?: Date | undefined,
      dataFim?: Date | undefined
    ) {
      this.nome = nome;
      this.cpf = cpf;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
    }
}
