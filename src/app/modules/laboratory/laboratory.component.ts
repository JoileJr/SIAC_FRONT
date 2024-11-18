import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrl: './laboratory.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaboratoryComponent {

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    closeDialog() {
        this.visible = false;
    }
}
