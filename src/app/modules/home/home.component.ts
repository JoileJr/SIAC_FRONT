import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { RoutesConstants } from "../../core/constants/routes.constants";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { FilterExamRequest } from "../../core/interfaces/useCases/filter-exam.request";
import { ExamService } from "../../core/services/exam/exam.service";
import { ToastService } from "../../core/services/toastr/toast.service";
import { PatientService } from "../../core/services/patient/patient.service";
import { ExameDTO } from "../../core/interfaces/dtos/exame.dto";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    totalExams: number = 0;
    routesConstants = RoutesConstants;
    user = this.authenticationService.user;
    exams: ExameDTO[] = [];

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private patientService: PatientService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private examService: ExamService
    ) {
        const filter: FilterExamRequest = {
            cpf: this.user!.cpf,
            tipoExame: undefined,
            dataInicio: undefined,
            dataFim: undefined
        }
        this.findExamsByFilter(filter);
    }

    redHist(): void {
        this.patientService.selectItem(this.user);
        this.redirectRoute(RoutesConstants.EXAM_HIST)
    }

    redirectRoute(route: string): void {
        this.router.navigate([route]);
    }

    findExamsByFilter(filter: FilterExamRequest) {
        this.examService.findByFilter(filter).subscribe({
          next: (data) => {
            this.toastService.success("Sucesso", "Busca de exames realizada com sucesso.");
            this.totalExams = data.length
            this.exams = data.length > 5 ? data.slice(0, 5) : data;
            this.cd.markForCheck();
          },
          error: (error: HttpErrorResponse) => {
            this.toastService.error("Atenção", "Falha ao buscar exames.");
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

}
