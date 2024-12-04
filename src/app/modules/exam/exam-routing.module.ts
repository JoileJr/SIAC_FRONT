import { RouterModule, Routes } from "@angular/router";
import { ExamComponent } from "./exam.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: "",
        component: ExamComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ExamRoutingModule {}
