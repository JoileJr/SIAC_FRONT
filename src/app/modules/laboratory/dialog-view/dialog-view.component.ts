import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LaboratorioDTO } from '../../../core/interfaces/dtos/laboratorio.dto';

@Component({
  selector: 'app-dialog-view',
  templateUrl: './dialog-view.component.html',
  styleUrl: './dialog-view.component.scss'
})
export class DialogViewComponent {
    @Input() visible: boolean = false;
    @Input() laboratorio!: LaboratorioDTO;
    @Output() closeDialogView = new EventEmitter<void>();

}
