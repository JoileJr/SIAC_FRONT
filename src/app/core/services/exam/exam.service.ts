import { ExameDTO } from './../../interfaces/dtos/exame.dto';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterExamRequest } from '../../interfaces/useCases/filter-exam.request';

@Injectable({
    providedIn: 'root'
})
export class ExamService {
    private apiUrl = `${environment.baseUrl}exam/`;

    constructor(private http: HttpClient) { }

    create(exame: ExameDTO): Observable<ExameDTO> {
        return this.http.post<ExameDTO>(`${this.apiUrl}`, exame);
    }

    findByFilter(exame: FilterExamRequest): Observable<ExameDTO[]> {
        return this.http.post<ExameDTO[]>(`${this.apiUrl}list`, exame);
    }

    enviarResultadoPorEmail(code: number): Observable<any> {
        const url = `${this.apiUrl}enviar-resultado/${code}`;
        return this.http.get(url);
    }

    exportarRelatorio(code: number): Observable<Blob> {
        const url = `${this.apiUrl}relatorio/pdf/${code}`;
        return this.http.get(url, {
          responseType: 'blob',
          headers: new HttpHeaders().set('Accept', 'application/pdf'),
        });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}${id}`);
    }

    findByID(id: string): Observable<ExameDTO> {
        return this.http.get<ExameDTO>(`${this.apiUrl}res/${id}`);
    }

}
