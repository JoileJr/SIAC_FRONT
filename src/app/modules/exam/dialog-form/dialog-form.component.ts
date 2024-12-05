import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParametroDTO } from '../../../core/interfaces/dtos/parametro.dto';
import { PatientService } from '../../../core/services/patient/patient.service';
import { PessoaDTO } from '../../../core/interfaces/dtos/pessoa.dto';
import { TipoExameDTO } from '../../../core/interfaces/dtos/tipo-exame.dto';
import { LaboratorioDTO } from '../../../core/interfaces/dtos/laboratorio.dto';
import { ProfissionalSaudeDTO } from '../../../core/interfaces/dtos/profissional-saude.dto';

export interface IResultadoForm {
    parametroId: FormControl<number | null>;
    nome: FormControl<string | null>;
    resultado: FormControl<string | null>;
    observacao: FormControl<string | null>;
    nivelDeAlerta: FormControl<string | null>;
    parametro: FormControl<string | null>;
}

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent implements OnInit {
    @Input() visible: boolean = false;
    @Input() typesExams!: TipoExameDTO[];
    @Input() profissionaisSaude!: ProfissionalSaudeDTO[];
    @Input() patients!: PessoaDTO[];
    @Input() laboratorio!: LaboratorioDTO;
    @Output() closeDialog = new EventEmitter<void>();
    resultadoForm!: FormGroup;

    alertOptions: any[] = [
        { label: 'Alto', value: 'Alto' },
        { label: 'Médio', value: 'Médio' },
        { label: 'Baixo', value: 'Baixo' }
    ];

    parametros: ParametroDTO[] = [
      { id: 1, nome: 'Hemoglobina', unidadeDeMedida: 'g/dL', valorReferenciaMinimo: '12.0', valorReferenciaMaximo: '16.0' },
      { id: 2, nome: 'Hemácias', unidadeDeMedida: 'milhões/mm³', valorReferenciaMinimo: '4.5', valorReferenciaMaximo: '5.5'},
      { id: 3, nome: 'Hematócrito', unidadeDeMedida: '%', valorReferenciaMinimo: '36', valorReferenciaMaximo: '50' },
      { id: 4, nome: 'Leucócitos', unidadeDeMedida: '/mm³', valorReferenciaMinimo: '4000', valorReferenciaMaximo: '11000' },
      { id: 5, nome: 'Plaquetas', unidadeDeMedida: 'mil/mm³', valorReferenciaMinimo: '150', valorReferenciaMaximo: '400' },
      { id: 6, nome: 'Glicose', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: '70', valorReferenciaMaximo: '99' },
      { id: 7, nome: 'Colesterol Total', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: '0', valorReferenciaMaximo: '200' },
      { id: 8, nome: 'Colesterol HDL', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: '40', valorReferenciaMaximo: '60' },
      { id: 9, nome: 'Triglicerídeos', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: '0', valorReferenciaMaximo: '150' },
      { id: 10, nome: 'Creatinina', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: '0.7', valorReferenciaMaximo: '1.3' }
    ];

    constructor(
        private fb: FormBuilder,
        private patientService: PatientService,
    ) {}

    ngOnInit(): void {
        this.resultadoForm = this.fb.group({
            profissionalSaude: [null, Validators.required],
            paciente: [null, Validators.required],
            tipoExame: [null, Validators.required],
            resultados: this.fb.array(this.parametros.map(parametro => this.fb.group({
              resultado: [null, [Validators.required]],
              observacao: [null, Validators.required],
              nivelDeAlerta: [null, Validators.required],
              parametro: [parametro]
            })))
        });
    }

    get resultados(): FormArray {
      return this.resultadoForm.get('resultados') as FormArray;
    }

    onSubmit(): void {
        if (this.resultadoForm.valid) {
          console.log('Formulário enviado com sucesso:', this.resultadoForm.value);
        }
    }
}