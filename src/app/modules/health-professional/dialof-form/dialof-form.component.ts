import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ProfissionalSaudeDTO } from '../../../core/interfaces/dtos/profissional-saude.dto';
import { HealProfessionalService } from '../../../core/services/health-professional/health-professional.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoUsuario } from '../../../core/interfaces/enums/TipoUsuario';

interface IsignUpFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    telefone: FormControl<string | null>;
    sexo: FormControl<string | null>;
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
            sexo: new FormControl<string | null>(patient.sexo, [Validators.required]),
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

    onSubmit(){

    }


}
