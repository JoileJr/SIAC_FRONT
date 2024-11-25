import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { HomeComponent } from "../home/home.component";
import { authGuard } from "../../core/guards/auth.guard";
import { loginGuard } from "../../core/guards/login.guard";
import { SingupComponent } from "../singup/singup.component";

const routes: Routes = [
    {
        path: "auth",
        canActivate: [loginGuard],
        loadChildren: () =>
            import("../login/login.module").then(
                (m) => m.LoginModule,
            ),
    },
    {
        path:  "singup",
        component: SingupComponent,
        loadChildren: () =>
            import("../singup/singup.module").then(
                (m) => m.SingUpModule,
            ),
    },
    {
        path: "app",
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "appointments",
                loadChildren: () =>
                    import("../appointments/appointment.module").then(
                        (m) => m.AppointmentsModule,
                    ),
            },
            {
                path: "services",
                loadChildren: () =>
                    import("../services/services.module").then(
                        (m) => m.ServicesModule,
                    ),
            },
            {
                path: "laboratory",
                loadChildren: () =>
                    import("../laboratory/laboratory.module").then(
                        (m) => m.LaboratoryModule,
                    ),
            },
            {
                path: "patient",
                loadChildren: () =>
                    import("../patient/patient.module").then(
                        (m) => m.PatientModule,
                    ),
            },
            {
                path: "**",
                redirectTo: "home"
            }
        ]
    },
    {
        path: "**",
        redirectTo: "app/home",
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
