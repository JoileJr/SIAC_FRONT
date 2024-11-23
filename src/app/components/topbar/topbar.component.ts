import { ChangeDetectionStrategy, Component, WritableSignal, signal } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { RoutesConstants } from "../../core/constants/routes.constants";

@Component({
    selector: 'sgs-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate([RoutesConstants.AUTH]);
    }
}