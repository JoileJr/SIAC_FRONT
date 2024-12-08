import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    examsCount: number = 25;

    constructor() { }

    onCardClick(): void {
        alert('Você clicou no card de exames!');
    }
    
}
