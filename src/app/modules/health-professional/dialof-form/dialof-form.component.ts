import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProfissionalSaudeDTO } from '../../../core/interfaces/dtos/profissional-saude.dto';
import { HealProfessionalService } from '../../../core/services/health-professional/health-professional.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoUsuario } from '../../../core/interfaces/enums/TipoUsuario';
import { take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfissionalSaudeRequest } from '../../../core/interfaces/useCases/profissional-saude.request.dto';
import { LaboratorioDTO } from '../../../core/interfaces/dtos/laboratorio.dto';

interface IsignUpFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    telefone: FormControl<string | null>;
    senha: FormControl<string | null>;
    sexo: FormControl<string | null>;
    regiao: FormControl<string | null>;
    email: FormControl<string | null>;
    registroProfissional: FormControl<string | null>;
    tipoProfissional: FormControl<string | null>;
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
    @Input() patient!: ProfissionalSaudeDTO;
    @Input() laboratorio!: LaboratorioDTO;
    @Input() isEditing: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();
    patientFg!: FormGroup<IsignUpFg>;

    constructor(
        private professionalService: HealProfessionalService,
        private toastService: ToastService
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['patient'] && changes['patient'].currentValue) {
            this.createForm(changes['patient'].currentValue);
        }
    }

    createForm(patient: ProfissionalSaudeDTO): void {
        this.patientFg = new FormGroup(<IsignUpFg>{
            nome: new FormControl<string | null>(patient.nome, [Validators.required, Validators.pattern('^[A-Za-zÀ-ÿ ]+$')]),
            cpf: new FormControl<string | null>(patient.cpf, [Validators.required]),
            telefone: new FormControl<string | null>(patient.telefone, [Validators.required]),
            senha: new FormControl<string | null>(null),
            sexo: new FormControl<string | null>(patient.sexo, [Validators.required]),
            regiao: new FormControl<string | null>(patient.regiao),
            email: new FormControl<string | null>(patient.email, [Validators.required, Validators.email]),
            registroProfissional: new FormControl<string | null>(patient.registroProfissional, [Validators.required, Validators.pattern('^[0-9]{4,6}-[A-Z]*$')]),
            tipoProfissional: new FormControl<string | null>(patient.tipoProfissional, [Validators.required]),
            dataNascimento: new FormControl<Date | null>(
                patient.dataNascimento ? new Date(patient.dataNascimento) : null,
                [Validators.required]
            ),
            perfis: new FormControl<string | null>(patient.perfis)
        });
    }

    sexOptions: any[] = [
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Outro', value: 'Outro' }
    ];

    perfilOptions: any[] = [
        {  value: TipoUsuario.BIOMEDICO },
        {  value: TipoUsuario.ENFERMEIRO },
        {  value: TipoUsuario.TECNICO_ENFERMAGEM },
        {  value: TipoUsuario.MEDICO }
    ];

    hideDialog() {
        this.visible = false;
        this.closeDialog.emit();
    }

    onSubmit(): void {
        if (!this.patientFg.valid) {
            this.toastService.error("Atenção", "Dados Inválidos.");
        }

        let senha = undefined;
        if(this.patientFg.controls.senha?.value){
            senha = this.patientFg.controls.senha.value;
        }

        const pessoaDTO: ProfissionalSaudeRequest = {
            nome: this.patientFg.controls.nome?.value!,
            cpf: this.patientFg.controls.cpf?.value!,
            telefone: this.patientFg.controls.telefone?.value!,
            sexo: this.patientFg.controls.sexo?.value!,
            email: this.patientFg.controls.email?.value!,
            dataNascimento: this.patientFg.controls.dataNascimento?.value!,
            perfis: this.patientFg.controls.tipoProfissional?.value!,
            registroProfissional: this.patientFg.controls.registroProfissional?.value!,
            tipoProfissional: this.patientFg.controls.tipoProfissional?.value!,
            laboratorio: this.laboratorio,
            regiao: this.patientFg.controls.regiao?.value!,
            senha: senha
        };

        if (this.patient.id){
            pessoaDTO.id = this.patient.id;
            this.update(pessoaDTO, this.patient.id);
        } else {
            this.create(pessoaDTO);
        }
        this.hideDialog();
    }

    create(dto: ProfissionalSaudeRequest): void {
        this.professionalService
            .create(dto)
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

    update(dto: ProfissionalSaudeRequest, id: number): void {
        this.professionalService
            .update(dto, id)
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


}
