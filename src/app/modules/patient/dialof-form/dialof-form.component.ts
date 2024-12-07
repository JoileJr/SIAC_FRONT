import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PessoaDTO } from '../../../core/interfaces/dtos/pessoa.dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { PatientService } from '../../../core/services/patient/patient.service';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

interface IsignUpFg {
    id: FormControl<string | null>;
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
  selector: 'app-dialof-form',
  templateUrl: './dialof-form.component.html',
  styleUrl: './dialof-form.component.scss'
})
export class DialofFormComponent implements OnChanges {
    @Input() visible: boolean = false;
    @Input() patient!: PessoaDTO;
    @Input() isEditing: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();
    patientFg!: FormGroup<IsignUpFg>;

    constructor(
        private patientService: PatientService,
        private toastService: ToastService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['patient'] && changes['patient'].currentValue) {
            this.createForm(changes['patient'].currentValue);
        }
    }

    createForm(patient: PessoaDTO): void {
        this.patientFg = new FormGroup(<IsignUpFg>{
            nome: new FormControl<string | null>(patient.nome, [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿ ]+$')]),
            cpf: new FormControl<string | null>(patient.cpf, [Validators.required]),
            telefone: new FormControl<string | null>(patient.telefone, [Validators.required]),
            sexo: new FormControl<string | null>(patient.sexo, [Validators.required]),
            email: new FormControl<string | null>(patient.email, [Validators.required, Validators.email]),
            senha: new FormControl<string | null>(null),
            dataNascimento: new FormControl<Date | null>(
                patient.dataNascimento ? new Date(patient.dataNascimento) : null,
                [Validators.required]
            ),
            perfis: new FormControl<string | null>(patient.perfis),
        });
    }

    sexOptions: any[] = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Outro', value: 'Outro' }
    ];

    onSubmit(): void {
        if (!this.patientFg.valid) {
            this.toastService.error("Atenção", "Dados Inválidos.");
        }

        let senha = undefined;
        if(this.patientFg.controls.senha?.value){
            senha = this.patientFg.controls.senha.value;
        }

        const pessoaDTO: PessoaDTO = {
            nome: this.patientFg.controls.nome?.value!,
            cpf: this.patientFg.controls.cpf?.value!,
            telefone: this.patientFg.controls.telefone?.value!,
            sexo: this.patientFg.controls.sexo?.value!,
            email: this.patientFg.controls.email?.value!,
            dataNascimento: this.patientFg.controls.dataNascimento?.value!,
            perfis: this.patientFg.controls.perfis?.value!,
            senha: senha
        };

        if (this.patient.id){
            pessoaDTO.id = this.patient.id;
            pessoaDTO.senha = this.patient.senha;
            this.update(pessoaDTO, this.patient.id);
        } else {
            pessoaDTO.perfis = []
            this.create(pessoaDTO);
        }
        this.hideDialog();
    }

    create(dto: PessoaDTO): void {
        this.patientService
            .createPatient(dto)
            .pipe(
                take(1)
            ).subscribe({
                next: (response) => {
                    this.toastService.success("Sucesso", "Cadastro realizado com sucesso.");
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar cadastro.");
                }
            });
    }

    update(dto: PessoaDTO, id: number): void {
        this.patientService
            .updatePatient(dto, id)
            .pipe(
                take(1)
            ).subscribe({
                next: (response) => {
                    this.toastService.success("Sucesso", "Atualização realizada com sucesso.");
                },
                error: (error: HttpErrorResponse) => {
                    this.toastService.error("Atenção", "Falha ao realizar atualização.");
                }
            });
    }

    hideDialog() {
        this.visible = false;
        this.closeDialog.emit();
    }

}
