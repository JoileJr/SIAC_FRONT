import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoUsuario } from '../../core/interfaces/enums/TipoUsuario';
import { ProfissionalSaudeDTO } from '../../core/interfaces/dtos/profissional-saude.dto';
import { HealProfessionalService } from '../../core/services/health-professional/health-professional.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

interface FilterFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    email: FormControl<string | null>;
    telefone: FormControl<string | null>;
    registroProfissional: FormControl<string | null>;
    tipoProfissional: FormControl<string | null>;
    dataNascimentoInicio: FormControl<Date | null>;
    dataNascimentoFinal: FormControl<Date | null>;
}

@Component({
  selector: 'app-health-professional',
  templateUrl: './health-professional.component.html',
  styleUrl: './health-professional.component.scss'
})
export class HealthProfessionalComponent {
    patients: ProfissionalSaudeDTO[] = [];
    selectedPatient: ProfissionalSaudeDTO = new ProfissionalSaudeDTO();
    dialogVisible: boolean = false;
    tableVisible: boolean = false;

    constructor(
        private professionalService: HealProfessionalService,
        private toastService: ToastService
    ) {}

    filterFg: FormGroup<FilterFg> = new FormGroup({
        nome: new FormControl<string | null>(null),
        cpf: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        telefone: new FormControl<string | null>(null),
        tipoProfissional: new FormControl<string | null>(null),
        registroProfissional: new FormControl<string | null>(null),
        dataNascimentoInicio: new FormControl<Date | null>(null),
        dataNascimentoFinal: new FormControl<Date | null>(null)
    });

    perfilOptions: any[] = [
        {  value: TipoUsuario.BIOMEDICO },
        {  value: TipoUsuario.ENFERMEIRO },
        {  value: TipoUsuario.TECNICO_ENFERMAGEM },
        {  value: TipoUsuario.MEDICO }
    ];

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    openDialog(patient?: ProfissionalSaudeDTO) {
        if (patient) {
          this.selectedPatient = patient;
        } else {
          this.selectedPatient = new ProfissionalSaudeDTO();
        }
        this.dialogVisible = true;
    }

    limparFormulario() {
        this.filterFg.reset();
    }

    selectPatient(patient: ProfissionalSaudeDTO) {
        this.openDialog(patient);
    }

    onSubmit() {
        /*const filterDto = new FilterPersonsRequest(
          this.filterFg.value.nome || undefined,
          this.filterFg.value.cpf || undefined,
          this.filterFg.value.dataNascimentoInicio || undefined,
          this.filterFg.value.dataNascimentoFinal || undefined
        );*/

        this.findPatients();
    }

    findPatients() {
        this.professionalService.getAll().subscribe({
          next: (data) => {
            if(data.length === 0){
                this.toastService.error("Atenção", "Nenhum funcionário encontrado");
                return;
            }
            this.patients = data;
            this.tableVisible = true;
            this.toastService.success("Sucesso", "Funcionários encontrados com sucesso.");
          },
          error: (error: HttpErrorResponse) => {
              this.tableVisible = false;
              this.toastService.error("Atenção", "Falha ao realizar busca.");
          }
        });
    }

    closeDialog() {
        this.dialogVisible = false;
        this.onSubmit();
    }
}
