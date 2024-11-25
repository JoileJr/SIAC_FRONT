import { RouterModule, Routes } from "@angular/router";
import { HealthProfessionalComponent } from "./health-professional.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        component: HealthProfessionalComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HealthProfessionalRoutingModule {}
