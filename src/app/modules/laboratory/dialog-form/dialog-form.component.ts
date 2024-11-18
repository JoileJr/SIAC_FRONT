import { CepService } from './../../../core/services/viacep/cep.service';
import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, take } from 'rxjs';
import { LabService } from '../../../core/services/laboratory/laboratory.service';
import { LaboratorioCreateRequest } from '../../../core/interfaces/useCases/labboratorio.create.request';
import { EnderecoDTO } from '../../../core/interfaces/dtos/endereco.dto';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
    @Input() visible: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();

    laboratorioForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private toastService: ToastService,
        private labService: LabService,
        private cepService: CepService,
        private authService: AuthenticationService
    ) {}

    loading: WritableSignal<boolean> = signal(false);

    labFg: FormGroup = new FormGroup({
        nome: new FormControl<string | null>(null, [Validators.required]),
        cnpj: new FormControl<string | null>(null, [Validators.required]),
        razaoSocial: new FormControl<string | null>(null, [Validators.required]),
        email: new FormControl<string | null>(null, [Validators.required]),
        telefone: new FormControl<string | null>(null, [Validators.required]),
        cep: new FormControl<string | null>(null, [Validators.required]),
        estado: new FormControl<string | null>(null, [Validators.required]),
        cidade: new FormControl<string | null>(null, [Validators.required]),
        bairro: new FormControl<string | null>(null, [Validators.required]),
        numero: new FormControl<string | null>(null, [Validators.required]),
        logradouro: new FormControl<string | null>(null, [Validators.required]),
        complemento: new FormControl<string | null>(null)
    });

    onSubmit(): void {
        if (!this.labFg.valid) {
            this.toastService.error("Atenção", "Dados Inválidos.");
            return;
        }

        const user = this.authService.user;

        const endereco: EnderecoDTO = {
            cep: this.labFg.get('cep')?.value,
            estado: this.labFg.get('estado')?.value,
            cidade: this.labFg.get('cidade')?.value,
            bairro: this.labFg.get('bairro')?.value,
            logradouro: this.labFg.get('logradouro')?.value,
            numero: this.labFg.get('numero')?.value,
            complemento: this.labFg.get('complemento')?.value,
        };

        const labDto: LaboratorioCreateRequest = {
            nome: this.labFg.get('nome')?.value,
            cnpj: this.labFg.get('cnpj')?.value,
            razaoSocial: this.labFg.get('razaoSocial')?.value,
            email: this.labFg.get('email')?.value,
            telefone: this.labFg.get('telefone')?.value,
            endereco: endereco,
            idAdm: user?.id
        };

        this.loading.set(true);

        this.labService
            .createLab(labDto)
            .pipe(
                take(1),
                finalize(() => this.loading.set(false)),
            ).subscribe({
                next: (response) => {
                    this.visible = false;
                    this.toastService.success("Sucesso", "Cadastro realizado com sucesso.");
                    this.closeDialog.emit(); // Emit event to close dialog after success
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar cadastro.");
                }
            });
    }

    findCep() {
        const cep = this.labFg.get('cep')?.value;

        if (cep && cep.length === 9) {
            this.loading.set(true);
            this.cepService
                .getAddress(cep)
                .pipe(
                    take(1),
                    finalize(() => this.loading.set(false))
                )
                .subscribe({
                    next: (response) => {
                        this.labFg.patchValue({
                            estado: response.state,
                            cidade: response.city,
                            bairro: response.neighborhood,
                            logradouro: response.street,
                        });
                    },
                    error: (error: HttpErrorResponse) => {
                        this.toastService.error("Atenção", "CEP inválido ou não encontrado.");
                    }
                });
        } else {
            this.toastService.error("Atenção", "CEP inválido.");
        }
    }


}
