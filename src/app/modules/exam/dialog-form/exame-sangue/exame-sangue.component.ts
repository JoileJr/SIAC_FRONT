import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ExameSangueFG {
    hemoglobina: FormControl<string | null>;
    hemacias: FormControl<string | null>;
    hematocrito: FormControl<string | null>;
    leucocitos: FormControl<string | null>;
    plaquetas: FormControl<string | null>;
    glicose: FormControl<string | null>;
    colesterolTotal: FormControl<string | null>;
    colesterolHDL: FormControl<string | null>;
    triglicerideos: FormControl<string | null>;
    creatinina: FormControl<string | null>;
}

@Component({
  selector: 'app-exame-sangue',
  templateUrl: './exame-sangue.component.html',
  styleUrl: './exame-sangue.component.scss'
})
export class ExameSangueComponent {

    parametros = [
        { id: 1, nome: 'Hemoglobina', unidadeDeMedida: 'g/dL', valorReferenciaMinimo: 12.0, valorReferenciaMaximo: 16.0 },
        { id: 2, nome: 'Hemácias', unidadeDeMedida: 'milhões/mm³', valorReferenciaMinimo: 4.5, valorReferenciaMaximo: 5.5 },
        { id: 3, nome: 'Hematócrito', unidadeDeMedida: '%', valorReferenciaMinimo: 36, valorReferenciaMaximo: 50 },
        { id: 4, nome: 'Leucócitos', unidadeDeMedida: '/mm³', valorReferenciaMinimo: 4000, valorReferenciaMaximo: 11000 },
        { id: 5, nome: 'Plaquetas', unidadeDeMedida: 'mil/mm³', valorReferenciaMinimo: 150, valorReferenciaMaximo: 400 },
        { id: 6, nome: 'Glicose', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: 70, valorReferenciaMaximo: 99 },
        { id: 7, nome: 'Colesterol Total', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: 0, valorReferenciaMaximo: 200 },
        { id: 8, nome: 'Colesterol HDL', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: 40, valorReferenciaMaximo: 60 },
        { id: 9, nome: 'Triglicerídeos', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: 0, valorReferenciaMaximo: 150 },
        { id: 10, nome: 'Creatinina', unidadeDeMedida: 'mg/dL', valorReferenciaMinimo: 0.7, valorReferenciaMaximo: 1.3 }
    ];


}
