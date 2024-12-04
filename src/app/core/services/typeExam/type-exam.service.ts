import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoExameDTO } from "../../interfaces/dtos/tipo-exame.dto";
import { ParametroDTO } from "../../interfaces/dtos/parametro.dto";

@Injectable({
    providedIn: 'root'
})
export class TypeExamService {
    private apiUrl = `${environment.baseUrl}tipoExame/`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<TipoExameDTO[]> {
        return this.http.get<TipoExameDTO[]>(`${this.apiUrl}`);
    }

    getParameterByTypeExam(id: number): Observable<ParametroDTO[]> {
        return this.http.get<ParametroDTO[]>(`${this.apiUrl}parametros/${id}`);
    }

}
