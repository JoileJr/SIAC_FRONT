import { PatientService } from './../../core/services/patient/patient.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PessoaDTO } from '../../core/interfaces/dtos/pessoa.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toastr/toast.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientComponent implements OnInit {
    patients!: PessoaDTO[];
    selectedPatient: PessoaDTO = new PessoaDTO();
    dialogVisible: boolean = false;

    constructor(
      private patientService: PatientService,
      private messageService: MessageService,
      private toastService: ToastService
    ) {
    }

    ngOnInit() {
      this.findPatients();
    }

    openDialog(patient?: PessoaDTO) {
        if (patient) {
          this.selectedPatient = patient;
        } else {
          this.selectedPatient = new PessoaDTO();
        }
        this.dialogVisible = true;
    }

    selectPatient(patient: PessoaDTO) {
      this.openDialog(patient);
    }

    findPatients() {
      this.patientService.getAllPatients().subscribe({
        next: (data) => {
          this.patients = data;
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error("Atenção", "Falha ao realizar busca.");
        }
      });
    }

    closeDialog() {
      this.dialogVisible = false;
      this.findPatients();
    }

}
