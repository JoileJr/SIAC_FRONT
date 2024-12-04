import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface FilterFg {
    cpf: FormControl<string | null>;
    tipoExame: FormControl<string | null>;
    dataInicio: FormControl<Date | null>;
    dataFinal: FormControl<Date | null>;
}


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss'
})
export class ExamComponent {
    dialogVisible: boolean = false;

    constructor() {}

    filterFg: FormGroup<FilterFg> = new FormGroup({
        cpf: new FormControl<string | null>(null),
        tipoExame: new FormControl<string | null>(null),
        dataInicio: new FormControl<Date | null>(null),
        dataFinal: new FormControl<Date | null>(null)
    });

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    limparFormulario() {
    }

    onSubmit() {
    }

    openDialog() {
        this.dialogVisible = true;
    }

    closeDialog() {
        this.dialogVisible = false;
    }

}
