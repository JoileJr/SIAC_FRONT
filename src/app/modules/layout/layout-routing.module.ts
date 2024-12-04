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
                path: "health-professional",
                loadChildren: () =>
                    import("../health-professional/health-professional.module").then(
                        (m) => m.HealthProfessionalModule,
                    ),
            },
            {
                path: "exam",
                loadChildren: () =>
                    import("../exam/exam.module").then(
                        (m) => m.ExamModule,
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
