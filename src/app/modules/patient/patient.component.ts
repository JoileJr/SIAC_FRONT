import { PatientService } from './../../core/services/patient/patient.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PessoaDTO } from '../../core/interfaces/dtos/pessoa.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../core/services/toastr/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterPersonsRequest } from '../../core/interfaces/useCases/filter-person-request';

interface FilterFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    dataNascimentoInicio: FormControl<Date | null>;
    dataNascimentoFinal: FormControl<Date | null>;
}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientComponent implements OnInit {
    patients: PessoaDTO[] = [];
    selectedPatient: PessoaDTO = new PessoaDTO();
    dialogVisible: boolean = false;
    tableVisible: boolean = false;

    constructor(
      private patientService: PatientService,
      private messageService: MessageService,
      private toastService: ToastService
    ) {}

    filterFg: FormGroup<FilterFg> = new FormGroup({
        nome: new FormControl<string | null>(null),
        cpf: new FormControl<string | null>(null),
        dataNascimentoInicio: new FormControl<Date | null>(null),
        dataNascimentoFinal: new FormControl<Date | null>(null)
    });

    ngOnInit() {
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

    findPatients(filterDto: FilterPersonsRequest) {
      this.patientService.findByFilter(filterDto).subscribe({
        next: (data) => {
            this.patients = data;
            this.tableVisible = true;
            this.toastService.success("Sucesso", "Pacientes encontrados com sucesso.");
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

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    limparFormulario() {
        this.filterFg.reset();
    }

    onSubmit() {
        const filterDto = new FilterPersonsRequest(
          this.filterFg.value.nome || undefined,
          this.filterFg.value.cpf || undefined,
          this.filterFg.value.dataNascimentoInicio || undefined,
          this.filterFg.value.dataNascimentoFinal || undefined
        );

        this.findPatients(filterDto);
    }

}
