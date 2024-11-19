import { ChangeDetectionStrategy, Component, } from '@angular/core';
import { LaboratorioDTO } from '../../core/interfaces/dtos/laboratorio.dto';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaboratoryComponent {
    laboratorio: LaboratorioDTO;

    visible: boolean = false;

    constructor() {
        this.laboratorio = {
            id: 1,
            nome: 'Laboratório XYZ',
            cnpj: '12.345.678/0001-99',
            telefone: '(11) 1234-5678',
            razaoSocial: 'Laboratório de Análises Clínicas XYZ LTDA',
            email: 'contato@laboratorioxyz.com',
            endereco: {
                id: 1,
                cep: '12345-678',
                estado: 'SP',
                cidade: 'São Paulo',
                bairro: 'Centro',
                logradouro: 'Rua das Flores',
                numero: '123',
                complemento: 'Apto 101'
            }
        };
    }

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
