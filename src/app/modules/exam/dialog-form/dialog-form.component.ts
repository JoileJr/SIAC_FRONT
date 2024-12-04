import { TypeExamService } from './../../../core/services/typeExam/type-exam.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.scss'
})
export class DialogFormComponent {
    @Input() visible: boolean = false;
    @Output() closeDialog = new EventEmitter<void>();

    constructor(
        typeExamService: TypeExamService,
    ){}

}
