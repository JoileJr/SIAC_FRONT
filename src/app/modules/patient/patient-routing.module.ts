import { RouterModule, Routes } from "@angular/router";
import { PatientComponent } from "./patient.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        component: PatientComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PatientRoutingModule {}
