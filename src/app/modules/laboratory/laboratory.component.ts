import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { LabService } from '../../core/services/laboratory/laboratory.service';
import { take } from 'rxjs';
import { ToastService } from '../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from '../../core/services/patient/patient.service';
import { ConfirmationService, MessageService } from 'primeng/api';

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
        private pacienteService: PatientService,
        private toastService: ToastService,
        private cd: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.pacienteService.findByID(this.authService.user!.id!).subscribe(
            {
            next: (response) => {
                this.user = response;
                this.getLabByID(this.user?.laboratorio?.id)
            },
            error: (error: HttpErrorResponse) => {}}
        )
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
                    this.laboratorio = new LaboratorioDTO();
                    this.toastService.error("Atenção", "Falha ao buscar laboratório.");
                }
            });
    }

    confirm(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Tem certeza que deseja excluir este laboratório?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel:"Excluir",
            rejectLabel:"Cancelar",
            rejectButtonStyleClass:"p-button-text",
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmado', detail: 'Excluido com sucesso' });
            },
            reject: () => {
            }
        });
    }

}
