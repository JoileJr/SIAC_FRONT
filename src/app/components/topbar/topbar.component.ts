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
            this.menusAdminF();
        } else if (this.user?.perfis[0].id == 2) {
            this.menusAdmin();
        } else if (this.user?.perfis[0].id == 3) {
            this.menusProfSaude();
        } else if (this.user?.perfis[0].id == 4) {
            this.menusProfSaude();
        } else if (this.user?.perfis[0].id == 6) {
            this.menusProfSaude();
        } else if (this.user?.perfis[0].id == 7) {
            this.menusProfSaude();
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
                label: 'Funcionários',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.HEALTH_PROFESSIONAL);
                }
            },
            {
                label: 'Exames',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.EXAM);
                }
            }
        ];
    }

    menusProfSaude() {
        this.items = [
            {
                label: 'Inicio',
                icon: 'pi pi-home',
                command: () => {
                    this.redirectRoute(this.routesConstants.HOME);
                }
            },
            {
                label: 'Exames',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.EXAM);
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

    menusAdminF() {
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
                label: 'Funcionários',
                icon: 'pi pi-users',
                command: () => {
                    this.redirectRoute(this.routesConstants.HEALTH_PROFESSIONAL);
                }
            },
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
