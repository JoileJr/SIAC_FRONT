import { CepService } from './../../../core/services/viacep/cep.service';
import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, take } from 'rxjs';
import { LabService } from '../../../core/services/laboratory/laboratory.service';
import { LaboratorioCreateRequest } from '../../../core/interfaces/useCases/labboratorio.create.request';
import { EnderecoDTO } from '../../../core/interfaces/dtos/endereco.dto';
import { LaboratorioDTO } from '../../../core/interfaces/dtos/laboratorio.dto';

interface LabFg {
    nome: FormControl<string | null>
    cnpj:  FormControl<string | null>
    razaoSocial:  FormControl<string | null>
    email:  FormControl<string | null>
    telefone:  FormControl<string | null>
    cep:  FormControl<string | null>
    estado:  FormControl<string | null>
    cidade:  FormControl<string | null>
    bairro:  FormControl<string | null>
    numero:  FormControl<string | null>
    logradouro:  FormControl<string | null>
    complemento:  FormControl<string | null>
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();
    @Input() laboratory!: LaboratorioDTO;
    loading: WritableSignal<boolean> = signal(false);
    labFg!: FormGroup<LabFg>;

    constructor(
        private toastService: ToastService,
        private labService: LabService,
        private cepService: CepService,
        private authService: AuthenticationService
    ) {
        this.createForm(new LaboratorioDTO);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['laboratory'] && changes['laboratory'].currentValue) {
            this.createForm(changes['laboratory'].currentValue);
        }
    }

    createForm(laboratory: LaboratorioDTO): void {
        this.labFg = new FormGroup(<LabFg>{
            nome: new FormControl<string | null>(laboratory.nome, [Validators.required]),
            cnpj: new FormControl<string | undefined>(laboratory.cnpj, [Validators.required]),
            razaoSocial: new FormControl<string | undefined>(laboratory.razaoSocial, [Validators.required]),
            email: new FormControl<string | undefined>(laboratory.email, [Validators.required]),
            telefone: new FormControl<string | undefined>(laboratory.telefone, [Validators.required]),
            cep: new FormControl<string | undefined>(laboratory.endereco?.cep, [Validators.required]),
            estado: new FormControl<string | undefined>(laboratory.endereco?.estado, [Validators.required]),
            cidade: new FormControl<string | undefined>(laboratory.endereco?.cidade, [Validators.required]),
            bairro: new FormControl<string | undefined>(laboratory.endereco?.bairro, [Validators.required]),
            numero: new FormControl<string | undefined>(laboratory.endereco?.numero, [Validators.required]),
            logradouro: new FormControl<string | undefined>(laboratory.endereco?.logradouro, [Validators.required]),
            complemento: new FormControl<string | undefined>(laboratory.endereco?.complemento)
        });
    }

    onSubmit(): void {
        if (!this.labFg.valid) {
            this.toastService.error("Atenção", "Dados Inválidos.");
            return;
        }

        const user = this.authService.user;

        const endereco: EnderecoDTO = {
            id: this.laboratory?.endereco?.id,
            cep: this.labFg.get('cep')?.value!,
            estado: this.labFg.get('estado')?.value!,
            cidade: this.labFg.get('cidade')?.value!,
            bairro: this.labFg.get('bairro')?.value!,
            logradouro: this.labFg.get('logradouro')?.value!,
            numero: this.labFg.get('numero')?.value!,
            complemento: this.labFg.get('complemento')?.value!,
        };

        const labDto: LaboratorioCreateRequest = {
            nome: this.labFg.get('nome')?.value!,
            cnpj: this.labFg.get('cnpj')?.value!,
            razaoSocial: this.labFg.get('razaoSocial')?.value!,
            email: this.labFg.get('email')?.value!,
            telefone: this.labFg.get('telefone')?.value!,
            endereco: endereco,
            idAdm: user?.id
        };

        this.loading.set(true);

        if (this.laboratory?.id){
            const labDto: LaboratorioDTO = {
                id: this.laboratory.id,
                nome: this.labFg.get('nome')?.value!,
                cnpj: this.labFg.get('cnpj')?.value!,
                razaoSocial: this.labFg.get('razaoSocial')?.value!,
                email: this.labFg.get('email')?.value!,
                telefone: this.labFg.get('telefone')?.value!,
                endereco: endereco,
            };

            this.updateLab(labDto, this.laboratory.id);
        } else {
            const labDto: LaboratorioCreateRequest = {
                nome: this.labFg.get('nome')?.value!,
                cnpj: this.labFg.get('cnpj')?.value!,
                razaoSocial: this.labFg.get('razaoSocial')?.value!,
                email: this.labFg.get('email')?.value!,
                telefone: this.labFg.get('telefone')?.value!,
                endereco: endereco,
                idAdm: user?.id
            };
            this.criarLab(labDto);
        }
    }

    criarLab(lab: LaboratorioCreateRequest){
        this.labService
            .createLab(lab)
            .pipe(
                take(1),
                finalize(() => this.loading.set(false)),
            ).subscribe({
                next: (response) => {
                    this.visible = false;
                    this.toastService.success("Sucesso", "Cadastro realizado com sucesso.");
                    this.closeDialog.emit();
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar cadastro.");
                }
            });
    }

    updateLab(lab: LaboratorioDTO, id: number) {
        this.labService
            .updateLab(lab, id)
            .pipe(
                take(1),
                finalize(() => this.loading.set(false)),
            ).subscribe({
                next: (response) => {
                    this.visible = false;
                    this.toastService.success("Sucesso", "Atualização realizado com sucesso.");
                    this.closeDialog.emit();
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar atualização.");
                }
            });
    }

    findCep() {
        const cep = this.labFg.controls.cep.value;
        if (!cep || cep.length !== 9) {
            this.toastService.error("Atenção", "CEP inválido. Verifique o campo de CEP.");
            return;
        }

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

    hideDialog() {
        this.visible = false;
        this.closeDialog.emit();
    }

}
