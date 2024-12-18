import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAuthResponse } from '../../interfaces/auth-response.interface';
import { environment } from '../../../../environments/environment';
import { SignUpRequest } from '../../interfaces/useCases/singup-request-dto';
import { PessoaDTO } from '../../interfaces/dtos/pessoa.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private baseUrl: string = environment.baseUrl;
    private authenticationKeyLocalStorage = 'authentication';
    private currentUserSubject: BehaviorSubject<IAuthResponse | null>;
    public currentUser: Observable<IAuthResponse | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<IAuthResponse | null>(this.getUserFromLocalStorage());
        this.currentUser = this.currentUserSubject.asObservable();
    }

    private getUserFromLocalStorage(): IAuthResponse | null {
        const userString = localStorage.getItem(this.authenticationKeyLocalStorage);
        return userString ? JSON.parse(userString) : null;
    }

    public get currentUserValue(): IAuthResponse | null {
        return this.currentUserSubject.value;
    }

    public get token(): string | null {
        return this.currentUserValue?.access_token || null;
    }

    public get user(): PessoaDTO | null {
        return this.currentUserValue?.user || null;
    }

    doUserLogin(cpf: string, senha: string): Observable<IAuthResponse> {
        return this.http.post<IAuthResponse>(
            `${this.baseUrl}auth/login`, { cpf, senha }
        ).pipe(
            tap(user => {
                this.setUserLocalStorage(user);
                this.currentUserSubject.next(user);
            })
        );
    }

    doSingUp(dto: SignUpRequest): Observable<any> {
        return this.http.post<any>(
            `${this.baseUrl}auth/sing-up`, dto
        )
    }

    logout(): void {
        localStorage.removeItem(this.authenticationKeyLocalStorage);
        this.currentUserSubject.next(null);
    }

    setUserLocalStorage(user: IAuthResponse): void {
        localStorage.setItem(this.authenticationKeyLocalStorage, JSON.stringify(user));
        this.currentUserSubject.next(user);
    }

    hasAuthenticationToken(): boolean {
        return !!this.token;
    }

}
