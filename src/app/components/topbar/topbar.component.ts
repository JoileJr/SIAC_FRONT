import {ChangeDetectionStrategy, Component, OnInit, WritableSignal, signal} from "@angular/core";
import {AuthenticationService} from "../../core/services/authentication/authentication.service";
import {Router} from "@angular/router";
import {RoutesConstants} from "../../core/constants/routes.constants";
import {MenuItem, MessageService} from "primeng/api";

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrl: './topbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit {
    routesConstants = RoutesConstants;
    items: MenuItem[] | undefined;
    user = this.authenticationService.user;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private messageService: MessageService
    ) {
    }

    ngOnInit() {
        if (this.user?.perfis[0].id == 1) {
            this.menusAdmin();
        } else {
            this.menusPac();
        }
    }

    menusAdmin() {
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

    menusPac() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                    this.redirectRoute(this.routesConstants.HOME);
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
