import { ChangeDetectionStrategy, Component, WritableSignal, signal } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { RoutesConstants } from "../../core/constants/routes.constants";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
    routesConstants = RoutesConstants;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate([RoutesConstants.AUTH]);
    }

    redirectRoute(route: string): void {
        this.router.navigate([route]);
    }
}
