import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CepBrasilApiResponse } from "../../interfaces/useCases/brasil-api-cep-response";

@Injectable({
    providedIn: 'root'
})
export class CepService {
    private apiUrl = `https://brasilapi.com.br/api/cep/v1`;

    constructor(private http: HttpClient) { }

    getAddress(cep: string): Observable<CepBrasilApiResponse> {
        return this.http.get<CepBrasilApiResponse>(`${this.apiUrl}/${cep}`);
    }

}
