import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, ChangeDetectorRef } from '@angular/core';
import { ParametroDTO } from '../../../core/interfaces/dtos/parametro.dto';
import { PessoaDTO } from '../../../core/interfaces/dtos/pessoa.dto';
import { TipoExameDTO } from '../../../core/interfaces/dtos/tipo-exame.dto';
import { LaboratorioDTO } from '../../../core/interfaces/dtos/laboratorio.dto';
import { ProfissionalSaudeDTO } from '../../../core/interfaces/dtos/profissional-saude.dto';
import { ResultadoParametroDTO } from '../../../core/interfaces/dtos/resultado-parametro.dto';
import { ExamService } from '../../../core/services/exam/exam.service';
import { ToastService } from '../../../core/services/toastr/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExameDTO } from '../../../core/interfaces/dtos/exame.dto';
import { TypeExamService } from '../../../core/services/typeExam/type-exam.service';

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
export class DialogFormComponent implements OnInit, OnChanges {
    @Input() visible: boolean = false;
    @Input() typesExams!: TipoExameDTO[];
    @Input() profissionaisSaude!: ProfissionalSaudeDTO[];
    @Input() patients!: PessoaDTO[];
    @Input() laboratorio!: LaboratorioDTO;
    @Input() selectedExam?: ExameDTO;
    @Output() closeDialog = new EventEmitter<void>();
    resultadoForm!: FormGroup;

    alertOptions: any[] = [
        { label: 'Alto', value: 'Alto' },
        { label: 'Médio', value: 'Médio' },
        { label: 'Baixo', value: 'Baixo' }
    ];

    parametros: ParametroDTO[] = [];

    constructor(
        private fb: FormBuilder,
        private exameService: ExamService,
        private toastService: ToastService,
        private tpExamService: TypeExamService,
        private cd: ChangeDetectorRef,
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes['selectedExam'] && changes['selectedExam'].currentValue) {
            if(this.selectedExam){
                this.populateForm(this.selectedExam);
            }
        } else {
            if(!this.selectedExam){
                this.criaResultadoForm();
            }
        }

        if (changes['typesExams'] && this.resultadoForm.get('tipoExame')?.value) {
            this.findParamsByTypeExams(this.resultadoForm.get('tipoExame')?.value);
        }
    }

    ngOnInit(): void {
        this.criaResultadoForm();
    }

    criaResultadoForm(){
        this.resultadoForm = this.fb.group({
            id: [null],
            dataExame: [null, Validators.required],
            profissionalSaude: [null, Validators.required],
            paciente: [null, Validators.required],
            tipoExame: [null, Validators.required],
            resultados: this.fb.array([])
        });

        this.resultadoForm.get('tipoExame')?.valueChanges.subscribe(typeExame => {
            if (typeExame) {
                this.findParamsByTypeExams(typeExame);
            }
        });

        // Habilita o campo tipoExame no caso de um novo exame
        if (!this.selectedExam) {
            this.resultadoForm.get('tipoExame')?.enable();
        }
    }

    get resultados(): FormArray {
      return this.resultadoForm.get('resultados') as FormArray;
    }

    onSubmit(): void {
        if (this.resultadoForm.valid) {
            const exame: ExameDTO = {
                id: this.resultadoForm.get('id')?.value,
                dataExame: this.resultadoForm.get('dataExame')?.value,
                paciente: this.resultadoForm.get('paciente')?.value,
                profissionalSaude: this.resultadoForm.get('profissionalSaude')?.value,
                laboratorio: this.laboratorio,
                tipoExame: this.resultadoForm.get('tipoExame')?.value,
                resultadoParametros: this.resultados.controls.map((resultadoFormGroup, i) => {
                    return {
                        id: resultadoFormGroup.get('id')?.value,
                        resultado: resultadoFormGroup.get('resultado')?.value,
                        observacao: resultadoFormGroup.get('observacao')?.value,
                        nivelDeAlerta: resultadoFormGroup.get('nivelDeAlerta')?.value,
                        parametro: this.parametros[i]
                    } as ResultadoParametroDTO;
                })
            };

            console.log('Formulário enviado com sucesso:', exame);
            this.criarExame(exame);
        }
    }

    criarExame(dto: ExameDTO) {
        this.exameService.create(dto).subscribe({
            next: (data) => {
                this.toastService.success("Sucesso", "Exame criado com sucesso.");
                this.hideDialog();
            },
            error: (error: HttpErrorResponse) => {
                this.toastService.error("Atenção", "Falha ao criar exame.");
            }
        });
    }

    hideDialog() {
        this.visible = false;
        this.closeDialog.emit();
    }

    populateForm(exam: ExameDTO): void {
        this.resultadoForm.patchValue({
            id: exam.id,
            dataExame: new Date(exam.dataExame),
            profissionalSaude: exam.profissionalSaude,
            paciente: exam.paciente,
            tipoExame: exam.tipoExame,
        });

        const resultadoArray = this.resultadoForm.get('resultados') as FormArray;
        exam.resultadoParametros.forEach((parametro, index) => {
            if (resultadoArray.at(index)) {
                resultadoArray.at(index).patchValue({
                    id: parametro.id,
                    resultado: parametro.resultado,
                    observacao: parametro.observacao,
                    nivelDeAlerta: parametro.nivelDeAlerta
                });
            }
        });

        this.resultadoForm.get('tipoExame')?.disable();
    }

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    findParamsByTypeExams(typeExam: TipoExameDTO) {
        if (!typeExam.id) {
            return;
        }
        this.tpExamService.getParameterByTypeExam(typeExam.id).subscribe({
            next: (data) => {
                this.parametros = data;
                this.createResultadoFields();
                this.cd.markForCheck();
            },
            error: (error: HttpErrorResponse) => {
                console.error('Erro ao buscar parâmetros:', error);
            }
        });
    }

    createResultadoFields() {
        const resultadosArray = this.resultadoForm.get('resultados') as FormArray;
        resultadosArray.clear();

        if(this.selectedExam?.resultadoParametros){
            this.selectedExam.resultadoParametros.forEach(obj => {
                resultadosArray.push(this.fb.group({
                    id: [obj.id],
                    resultado: [obj.resultado, [Validators.required]],
                    observacao: [obj.observacao, Validators.required],
                    nivelDeAlerta: [obj.nivelDeAlerta, Validators.required],
                    parametro: [obj.parametro]
                }));
            });
        } else {
            this.parametros.forEach(parametro => {
                resultadosArray.push(this.fb.group({
                    id: [null],
                    resultado: [null, [Validators.required]],
                    observacao: [null, Validators.required],
                    nivelDeAlerta: [null, Validators.required],
                    parametro: [parametro]
                }));
            });
        }
    }

}
