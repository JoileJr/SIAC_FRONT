import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeExamService } from '../../core/services/typeExam/type-exam.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TipoExameDTO } from '../../core/interfaces/dtos/tipo-exame.dto';
import { LabService } from '../../core/services/laboratory/laboratory.service';
import { PatientService } from '../../core/services/patient/patient.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';
import { take } from 'rxjs';
import { FilterHealthProfessionalRequest } from '../../core/interfaces/useCases/filter-health-professional.request';
import { HealProfessionalService } from '../../core/services/health-professional/health-professional.service';
import { ProfissionalSaudeDTO } from '../../core/interfaces/dtos/profissional-saude.dto';
import { PessoaDTO } from '../../core/interfaces/dtos/pessoa.dto';

interface FilterFg {
    cpf: FormControl<string | null>;
    tipoExame: FormControl<string | null>;
    dataInicio: FormControl<Date | null>;
    dataFinal: FormControl<Date | null>;
}


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
    dialogVisible: boolean = false;
    typesExams: TipoExameDTO[] = [];
    profissionaisSaude: ProfissionalSaudeDTO[] = [];
    patients: PessoaDTO[] = [];
    user = this.authService.user;
    laboratorio!: LaboratorioDTO;

    constructor(
        private tpExamService: TypeExamService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private labService: LabService,
        private pacienteService: PatientService,
        private authService: AuthenticationService,
        private professionalService: HealProfessionalService
    ) {
        this.findTypeExams();
        this.getLab();

        const filterProfDto = new FilterHealthProfessionalRequest();
        filterProfDto.laboratorio = this.laboratorio;
        this.findProf(filterProfDto);
        this.findPatients();
    }

    filterFg: FormGroup<FilterFg> = new FormGroup({
        cpf: new FormControl<string | null>(null),
        tipoExame: new FormControl<string | null>(null),
        dataInicio: new FormControl<Date | null>(null),
        dataFinal: new FormControl<Date | null>(null)
    });

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    findTypeExams() {
        this.tpExamService.getAll().subscribe({
          next: (data) => {
            this.typesExams = data;
            this.cd.markForCheck();
          },
          error: (error: HttpErrorResponse) => {
          }
        });
    }

    limparFormulario() {
    }

    onSubmit() {
    }

    openDialog() {
        this.dialogVisible = true;
    }

    closeDialog() {
        this.dialogVisible = false;
    }

    getLab(){
        this.pacienteService.findByID(this.authService.user!.id!).subscribe(
            {
            next: (response) => {
                this.user = response;
                this.getLabByID(this.user?.laboratorio?.id)
            },
            error: (error: HttpErrorResponse) => {}}
        )
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
                    this.toastService.success("Sucesso", "Busca realizado com sucesso.");
                },
                error: (error: HttpErrorResponse) => {
                    this.laboratorio = new LaboratorioDTO();
                    this.toastService.error("Atenção", "Falha ao buscar laboratório.");
                }
            });
    }

    findProf(dto: FilterHealthProfessionalRequest) {
        this.professionalService.findByFilter(dto).subscribe({
          next: (data) => {
            this.profissionaisSaude = data;
            this.toastService.success("Sucesso", "Funcionários encontrados com sucesso.");
          },
          error: (error: HttpErrorResponse) => {
              this.toastService.error("Atenção", "Falha ao realizar busca.");
          }
        });
    }

    findPatients() {
        this.pacienteService.getAllPatients().subscribe({
          next: (data) => {
              this.patients = data;
              this.toastService.success("Sucesso", "Pacientes encontrados com sucesso.");
          },
          error: (error: HttpErrorResponse) => {
              this.toastService.error("Atenção", "Falha ao realizar busca.");
          }
        });
    }

}
