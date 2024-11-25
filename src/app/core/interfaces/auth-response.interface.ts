import { PessoaDTO } from "./dtos/pessoa.dto";

export interface IAuthResponse {
    access_token: string;
    authorities: any;
    user: PessoaDTO;
}
