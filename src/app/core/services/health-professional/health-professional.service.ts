import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FilterPersonsRequest } from "../../interfaces/useCases/filter-person-request";
import { ProfissionalSaudeDTO } from "../../interfaces/dtos/profissional-saude.dto";
import { ProfissionalSaudeRequest } from "../../interfaces/useCases/profissional-saude.request.dto";
import { FilterHealthProfessionalRequest } from "../../interfaces/useCases/filter-health-professional.request";

@Injectable({
    providedIn: 'root'
})
export class HealProfessionalService {
    private apiUrl = `${environment.baseUrl}enf/`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<ProfissionalSaudeDTO[]> {
        return this.http.get<ProfissionalSaudeDTO[]>(`${this.apiUrl}`);
    }

    create(dto: ProfissionalSaudeRequest): Observable<ProfissionalSaudeDTO> {
        return this.http.post<ProfissionalSaudeDTO>(`${this.apiUrl}`, dto);
    }

    findByFilter(dto: FilterHealthProfessionalRequest): Observable<ProfissionalSaudeDTO[]> {
        return this.http.post<ProfissionalSaudeDTO[]>(`${this.apiUrl}find`, dto);
    }

    update(dto: ProfissionalSaudeRequest, id: number): Observable<ProfissionalSaudeDTO> {
        return this.http.put<ProfissionalSaudeDTO>(`${this.apiUrl}${id}`, dto);
    }

    findByID(id: number): Observable<ProfissionalSaudeDTO> {
        return this.http.get<ProfissionalSaudeDTO>(`${this.apiUrl}${id}`);
    }

}
