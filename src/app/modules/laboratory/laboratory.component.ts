import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { LabService } from '../../core/services/laboratory/laboratory.service';
import { take } from 'rxjs';
import { ToastService } from '../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaboratoryComponent {
    laboratorio?: LaboratorioDTO;
    visible: boolean = false;
    visivleView: boolean = false;
    user = this.authService.user;

    constructor(
        private authService: AuthenticationService,
        private labService: LabService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
    ) {
        this.getLabByID(this.user?.laboratorio?.id)
    }

    showDialog() {
        this.visible = true;
    }

    showDialogView() {
        this.visivleView = true;
    }

    closeDialog() {
        this.visible = false;
        this.visivleView = false;
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
                    this.toastService.error("Atenção", "Falha ao buscar laboratório.");
                }
            });
    }
}
