import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { VericityComponent } from "./vericity.component";

const routes: Routes = [
    {
        path: ":id",
        component: VericityComponent,
        canActivate: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VericityRoutingModule {}
