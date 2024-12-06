export class FilterExamRequest {
    cpf?: string;
    tipoExame?: number;
    dataInicio?: Date;
    dataFim?: Date;

    constructor(
        cpf?: string | undefined,
        tipoExame?: number | undefined,
        dataInicio?: Date | undefined,
        dataFim?: Date | undefined
    ) {
      this.cpf = cpf;
      this.tipoExame = tipoExame;
      this.dataInicio = dataInicio;
      this.dataFim = dataFim;
    }
}
