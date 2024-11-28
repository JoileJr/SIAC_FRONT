import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { Router } from "@angular/router";
import { RoutesConstants } from "../../core/constants/routes.constants";
import { MenuItem, MessageService } from "primeng/api";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
    routesConstants = RoutesConstants;
    items: MenuItem[] | undefined;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                    this.redirectRoute(this.routesConstants.HOME);
                }
            },
            {
                label: 'Pacientes',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.PATIENT);
                }
            },
            {
                label: 'Laboratório',
                icon: 'pi pi-building-columns',
                command: () => {
                    this.redirectRoute(this.routesConstants.LABORATORY);
                }
            },
            {
                label: 'Profissionais de Saúde',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.HEALTH_PROFESSIONAL);
                }
            }
        ];
    }

    logout(): void {
        this.authenticationService.logout();
        this.router.navigate([RoutesConstants.AUTH]);
    }

    redirectRoute(route: string): void {
        this.router.navigate([route]);
    }
}
