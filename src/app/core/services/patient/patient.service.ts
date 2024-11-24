import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PessoaDTO } from "../../interfaces/dtos/pessoa.dto";
import { Observable } from "rxjs";
import { FilterPersonsRequest } from "../../interfaces/useCases/filter-person-request";

@Injectable({
    providedIn: 'root'
})
export class PatientService {
    private apiUrl = `${environment.baseUrl}pac/`;

    constructor(private http: HttpClient) { }

    getAllPatients(): Observable<PessoaDTO[]> {
        return this.http.get<PessoaDTO[]>(`${this.apiUrl}`);
    }

    createPatient(dto: PessoaDTO): Observable<PessoaDTO> {
        return this.http.post<PessoaDTO>(`${this.apiUrl}`, dto);
    }

    findByFilter(dto: FilterPersonsRequest): Observable<PessoaDTO[]> {
        return this.http.post<PessoaDTO[]>(`${this.apiUrl}find`, dto);
    }

    updatePatient(dto: PessoaDTO, id: number): Observable<PessoaDTO> {
        return this.http.put<PessoaDTO>(`${this.apiUrl}${id}`, dto);
    }

}
