import { ChangeDetectorRef, Component } from '@angular/core';
import { PatientService } from '../../core/services/patient/patient.service';
import { PessoaDTO } from '../../core/interfaces/dtos/pessoa.dto';
import { TypeExamService } from '../../core/services/typeExam/type-exam.service';
import { ToastService } from '../../core/services/toastr/toast.service';
import { LabService } from '../../core/services/laboratory/laboratory.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { HealProfessionalService } from '../../core/services/health-professional/health-professional.service';
import { ExamService } from '../../core/services/exam/exam.service';
import { TipoExameDTO } from '../../core/interfaces/dtos/tipo-exame.dto';
import { ExameDTO } from '../../core/interfaces/dtos/exame.dto';
import { ProfissionalSaudeDTO } from '../../core/interfaces/dtos/profissional-saude.dto';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';
import { FilterHealthProfessionalRequest } from '../../core/interfaces/useCases/filter-health-professional.request';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FilterExamRequest } from '../../core/interfaces/useCases/filter-exam.request';

interface FilterFg {
    cpf: FormControl<string | null>;
    tipoExame: FormControl<number | null>;
    dataInicio: FormControl<Date | null>;
    dataFinal: FormControl<Date | null>;
}
@Component({
  selector: 'app-history-exams',
  templateUrl: './history-exams.component.html',
  styleUrl: './history-exams.component.scss'
})
export class HistoryExamsComponent {
    selectedItem?: PessoaDTO;
    typesExams: TipoExameDTO[] = [];
    exams: ExameDTO[] = [];
    selectedExam?: ExameDTO;
    profissionaisSaude: ProfissionalSaudeDTO[] = [];
    patients: PessoaDTO[] = [];
    user = this.authService.user;
    laboratorio!: LaboratorioDTO;
    tableVisible: boolean = false;

    filterFg: FormGroup<FilterFg> = new FormGroup({
        cpf: new FormControl<string | null>(null),
        tipoExame: new FormControl<number | null>(null),
        dataInicio: new FormControl<Date | null>(null),
        dataFinal: new FormControl<Date | null>(null)
    });

    constructor(
        private patientService: PatientService,
        private tpExamService: TypeExamService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private authService: AuthenticationService,
        private professionalService: HealProfessionalService,
        private examService: ExamService
    ) {
        this.patientService.selectedItem$.subscribe(item => {
            this.selectedItem = item;
        });
        this.findTypeExams();
    }

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
            cpf: this.selectedItem!.cpf,
            tipoExame: this.filterFg.value.tipoExame || undefined,
            dataInicio: this.filterFg.value.dataInicio || undefined,
            dataFim: this.filterFg.value.dataFinal || undefined
        }
        this.findExamsByFilter(filter)
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
