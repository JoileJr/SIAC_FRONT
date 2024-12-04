import { TipoExameDTO } from "./tipo-exame.dto";

export class ParametroDTO {
    id?: number;
    nome!: string;
    unidadeDeMedida!: string;
    valorReferenciaMinimo!: string;
    valorReferenciaMaximo!: string;
    tipoExame?: TipoExameDTO;
}
