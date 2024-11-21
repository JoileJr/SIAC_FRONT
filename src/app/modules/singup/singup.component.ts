import { ChangeDetectionStrategy, OnInit, signal, WritableSignal } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../core/interfaces/useCases/singup-request-dto';
import { TipoUsuario } from '../../core/interfaces/enums/TipoUsuario';
import { ToastService } from '../../core/services/toastr/toast.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { finalize, take } from "rxjs/operators";
import { HttpErrorResponse } from '@angular/common/http';

interface IsignUpFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    telefone: FormControl<string | null>;
    sexo: FormControl<string | null>;
    email: FormControl<string | null>;
    senha: FormControl<string | null>;
    dataNascimento: FormControl<Date | null>;
    perfis: FormControl<string | null>;
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingupComponent implements OnInit {
    loading: WritableSignal<boolean> = signal(false);

    signUpFg: FormGroup<IsignUpFg> = new FormGroup({
        nome: new FormControl<string | null>(null, [Validators.required]),
        cpf: new FormControl<string | null>(null, [Validators.required]),
        telefone: new FormControl<string | null>(null, [Validators.required]),
        sexo: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required]),
        senha: new FormControl<string | null>(null, [Validators.required]),
        dataNascimento: new FormControl<Date | null>(null, [Validators.required]),
        perfis: new FormControl<string | null>(null, [Validators.required])
    });

    sexOptions: any[] = [
      { label: 'Masculino', value: 'Masculino' },
      { label: 'Feminino', value: 'Feminino' },
      { label: 'Outro', value: 'Outro' }
    ];

    perfilOptions: any[] = [
      { label: TipoUsuario.PACIENTE, value: TipoUsuario.PACIENTE },
      { label: TipoUsuario.ADMINISTRADOR, value: TipoUsuario.ADMINISTRADOR }
    ];

    constructor(
        private toastService: ToastService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {}

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (!this.signUpFg.valid) {
            this.toastService.error("Atenção", "Dados Inválidos.");
        }

        const signUpData: SignUpRequest = {
            nome: this.signUpFg.controls.nome?.value!,
            cpf: this.signUpFg.controls.cpf?.value!,
            telefone: this.signUpFg.controls.telefone?.value!,
            sexo: this.signUpFg.controls.sexo?.value!,
            email: this.signUpFg.controls.email?.value!,
            senha: this.signUpFg.controls.senha?.value!,
            dataNascimento: this.signUpFg.controls.dataNascimento?.value!,
            perfis: this.signUpFg.controls.perfis?.value!,
        };

        this.authenticationService
            .doSingUp(signUpData)
            .pipe(
                take(1),
                finalize(() => this.loading.set(false)),
            ).subscribe({
                next: (response) => {
                    this.router.navigate(["/"]);
                    this.toastService.success("Sucesso", "Cadastro realizado com sucesso.");
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar cadastro.");
                }
            });
    }
}
