import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoUsuario } from '../../core/interfaces/enums/TipoUsuario';
import { ProfissionalSaudeDTO } from '../../core/interfaces/dtos/profissional-saude.dto';
import { HealProfessionalService } from '../../core/services/health-professional/health-professional.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { take } from 'rxjs';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';
import { LabService } from '../../core/services/laboratory/laboratory.service';
import { PatientService } from '../../core/services/patient/patient.service';
import { Message } from 'primeng/api';
import { FilterHealthProfessionalRequest } from '../../core/interfaces/useCases/filter-health-professional.request';

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
    user = this.authService.user;
    laboratorio?: LaboratorioDTO;

    constructor(
        private professionalService: HealProfessionalService,
        private authService: AuthenticationService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private labService: LabService,
        private patientService: PatientService,
    ) {
        this.patientService.findByID(this.authService.user!.id!).subscribe(
            {
            next: (response) => {
                this.user = response;
                this.getLabByID(this.user?.laboratorio?.id)
            },
            error: (error: HttpErrorResponse) => {}}
        )
    }

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
        const filterDto = new FilterHealthProfessionalRequest(
          this.filterFg.value.nome || undefined,
          this.filterFg.value.cpf || undefined,
          this.filterFg.value.telefone || undefined,
          this.filterFg.value.email || undefined,
          this.filterFg.value.registroProfissional || undefined,
          this.filterFg.value.tipoProfissional || undefined,
          this.filterFg.value.dataNascimentoInicio || undefined,
          this.filterFg.value.dataNascimentoFinal || undefined
        );

        this.findPatients(filterDto);
    }

    findPatients(dto: FilterHealthProfessionalRequest) {
        this.professionalService.findByFilter(dto).subscribe({
          next: (data) => {
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
    }

    getLabByID(id?: number) {
        if(!id){
            this.toastService.error("Atenção", "Você ainda não cadastrou Laboratório.");
            return
        }
        this.labService
            .getLabByID(id)
            .pipe(
                take(1),
            ).subscribe({
                next: (response) => {
                    this.laboratorio = response;
                    this.cd.markForCheck();
                },
                error: (error: HttpErrorResponse) => {
                    this.laboratorio = new LaboratorioDTO();
                    this.toastService.error("Atenção", "Você ainda não cadastrou seu laboratório.");
                }
            });
    }
}
