import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LaboratorioDTO } from "../../interfaces/dtos/laboratorio.dto";
import { LaboratorioCreateRequest } from "../../interfaces/useCases/labboratorio.create.request";

@Injectable({
    providedIn: 'root'
})
export class LabService {
    private apiUrl = `${environment.baseUrl}lab/`;

    constructor(private http: HttpClient) { }

    createLab(obj: LaboratorioCreateRequest): Observable<LaboratorioDTO> {
        return this.http.post<LaboratorioCreateRequest>(`${this.apiUrl}`, obj);
    }

}