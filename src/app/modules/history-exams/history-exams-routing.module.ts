import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HistoryExamsComponent } from "./history-exams.component";

const routes: Routes = [
    {
        path: "",
        component: HistoryExamsComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HistoryExamsRoutingModule {}
