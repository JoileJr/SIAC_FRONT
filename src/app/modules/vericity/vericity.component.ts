import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../core/services/toastr/toast.service';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';
import { ExamService } from '../../core/services/exam/exam.service';
import { ExameDTO } from '../../core/interfaces/dtos/exame.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { RoutesConstants } from '../../core/constants/routes.constants';

@Component({
  selector: 'app-vericity',
  templateUrl: './vericity.component.html',
  styleUrl: './vericity.component.scss'
})
export class VericityComponent implements OnInit {
    id: string | null = null;
    exame: ExameDTO | null = null;
    routesConstants = RoutesConstants;


    constructor(
        private route: ActivatedRoute,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private exameService: ExamService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id');
            console.log("ID from route:", this.id);

            if(this.id){
                this.exameService.findByID(this.id).subscribe({
                    next: (response) => {
                        this.exame = response;
                        this.cd.detectChanges();
                        this.toastService.success("Sucesso", "Busca concluída.");
                    },
                    error: (error: HttpErrorResponse) => {
                        this.toastService.error("Erro", "Falha ao buscar.");
                    }
                });
            }
        });
    }

    redirect(): void {
        this.router.navigate([this.routesConstants.AUTH]);
    }

    downloadRelatorio(): void {
        if (!this.exame?.id) {
            return;
        }
        this.exameService.exportarRelatorio(this.exame?.id).subscribe((pdfBlob) => {
            const blobUrl = window.URL.createObjectURL(pdfBlob);
            window.open(blobUrl);
            window.URL.revokeObjectURL(blobUrl);
        });
    }

}
