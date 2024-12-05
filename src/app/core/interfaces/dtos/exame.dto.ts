import { LaboratorioDTO } from "./laboratorio.dto";
import { PessoaDTO } from "./pessoa.dto";
import { ProfissionalSaudeDTO } from "./profissional-saude.dto";
import { ResultadoParametroDTO } from "./resultado-parametro.dto";
import { TipoExameDTO } from "./tipo-exame.dto";

export class ExameDTO {
    id?: number;
    dataExame!: Date;
    paciente!: PessoaDTO;
    profissionalSaude!: ProfissionalSaudeDTO;
    laboratorio!: LaboratorioDTO;
    tipoExame!: TipoExameDTO;
    resultadoParametros!: ResultadoParametroDTO[];
}
