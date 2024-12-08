import { FilterExamRequest } from './../../core/interfaces/useCases/filter-exam.request';
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
import { ExamService } from '../../core/services/exam/exam.service';
import { ExameDTO } from '../../core/interfaces/dtos/exame.dto';

interface FilterFg {
    cpf: FormControl<string | null>;
    tipoExame: FormControl<number | null>;
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
    exams: ExameDTO[] = [];
    selectedExam?: ExameDTO;
    profissionaisSaude: ProfissionalSaudeDTO[] = [];
    patients: PessoaDTO[] = [];
    user = this.authService.user;
    laboratorio!: LaboratorioDTO;
    tableVisible: boolean = false;

    constructor(
        private tpExamService: TypeExamService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private labService: LabService,
        private pacienteService: PatientService,
        private authService: AuthenticationService,
        private professionalService: HealProfessionalService,
        private examService: ExamService
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
        tipoExame: new FormControl<number | null>(null),
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

    findExamsByFilter(filter: FilterExamRequest) {
        this.examService.findByFilter(filter).subscribe({
          next: (data) => {
            this.toastService.success("Sucesso", "Busca de exames realizada com sucesso.");
            this.exams = data;
            this.cd.markForCheck();
            this.tableVisible = true;
          },
          error: (error: HttpErrorResponse) => {
            this.toastService.error("Atenção", "Falha ao buscar exames.");
            this.tableVisible = false;
          }
        });
    }

    limparFormulario() {
        this.filterFg.reset();
    }

    onSubmit() {
        const filter: FilterExamRequest = {
            cpf: this.filterFg.value.cpf || undefined,
            tipoExame: this.filterFg.value.tipoExame || undefined,
            dataInicio: this.filterFg.value.dataInicio || undefined,
            dataFim: this.filterFg.value.dataFinal || undefined
        }
        this.findExamsByFilter(filter)
    }

    selectExam(exame: ExameDTO) {
        this.openDialog(exame);
    }

    openDialog(exame?: ExameDTO) {
        if (exame) {
            this.selectedExam = exame;
        } else {
            this.selectedExam = undefined;
        }
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
            error: (error: HttpErrorResponse) => {
            }}
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

    formatToDDMMYYYY(dateString: string): string {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    downloadRelatorio(exame: ExameDTO): void {
        if (!exame.id) {
            return;
        }
        this.examService.exportarRelatorio(exame.id).subscribe((pdfBlob) => {
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            window.open(blobUrl);
            window.URL.revokeObjectURL(blobUrl);
        });
    }


    enviarEmail(exame: ExameDTO): void {
        if(!exame.id){
            return
        }
        this.examService.enviarResultadoPorEmail(exame.id).subscribe(
            {
                next: (data) => {},
                error: (error: HttpErrorResponse) => {}
            }
        );
        this.toastService.success("Sucesso", "Resultado enviado com sucesso.");

    }

}
