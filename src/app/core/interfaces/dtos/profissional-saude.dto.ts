import { TipoUsuario } from "../enums/TipoUsuario";
import { PessoaDTO } from "./pessoa.dto";

export class ProfissionalSaudeDTO extends PessoaDTO {
    registroProfissional!: string;
    tipoProfissional!: TipoUsuario;
    regiao!: string;
}
