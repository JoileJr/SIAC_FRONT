import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TipoUsuario } from '../../core/interfaces/enums/TipoUsuario';

interface FilterFg {
    nome: FormControl<string | null>;
    cpf: FormControl<string | null>;
    email: FormControl<string | null>;
    telefone: FormControl<string | null>;
    registroProfissional: FormControl<string | null>;
    tipoProfissional: FormControl<string | null>;
    dataNascimentoInicio: FormControl<Date | null>;
    dataNascimentoFinal: FormControl<Date | null>;
}

@Component({
  selector: 'app-health-professional',
  templateUrl: './health-professional.component.html',
  styleUrl: './health-professional.component.scss'
})
export class HealthProfessionalComponent {

    filterFg: FormGroup<FilterFg> = new FormGroup({
        nome: new FormControl<string | null>(null),
        cpf: new FormControl<string | null>(null),
        email: new FormControl<string | null>(null),
        telefone: new FormControl<string | null>(null),
        tipoProfissional: new FormControl<string | null>(null),
        registroProfissional: new FormControl<string | null>(null),
        dataNascimentoInicio: new FormControl<Date | null>(null),
        dataNascimentoFinal: new FormControl<Date | null>(null)
    });

    perfilOptions: any[] = [
        {  value: TipoUsuario.BIOMEDICO },
        {  value: TipoUsuario.ENFERMEIRO },
        {  value: TipoUsuario.TECNICO_ENFERMAGEM },
        {  value: TipoUsuario.MEDICO }
    ];

    blockTyping(event: KeyboardEvent) {
        event.preventDefault();
    }

    openDialog() {}

    limparFormulario() {
        this.filterFg.reset();
    }

    onSubmit() {
    }
}
