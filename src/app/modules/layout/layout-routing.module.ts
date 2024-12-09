import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout.component";
import { authGuard } from "../../core/guards/auth.guard";
import { loginGuard } from "../../core/guards/login.guard";
import { SingupComponent } from "../singup/singup.component";
import { VericityComponent } from "../vericity/vericity.component";

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
        path:  "truthfulness",
        loadChildren: () =>
            import("../vericity/vericity.module").then(
                (m) => m.VericityModule,
            ),
    },
    {
        path: "app",
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: "home",
                loadChildren: () =>
                    import("../home/home.module").then(
                        (m) => m.HomeModule,
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
                path: "history-exam",
                loadChildren: () =>
                    import("../history-exams/history-exams.module").then(
                        (m) => m.HistoryExamsModule,
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
