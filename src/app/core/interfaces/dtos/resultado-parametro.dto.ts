import { ParametroDTO } from "./parametro.dto";

export class ResultadoParametroDTO {
    id?: number;
    resultado!: string;
    observacao!: string;
    nivelDeAlerta!: string;
    parametro!: ParametroDTO;
    exame: any
}
