import { NgModule } from "@angular/core";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from "../../core/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { LaboratoryComponent } from "./laboratory.component";
import { LaboratoryRoutingModule } from "./laboratory-routing.module";
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from "primeng/selectbutton";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputMaskModule } from "primeng/inputmask";
import { CalendarModule } from "primeng/calendar";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        LaboratoryRoutingModule,
        SharedModule,
        FormsModule,
        TableModule,
        TagModule,
        RatingModule,
        DialogModule,
        CalendarModule,
        InputMaskModule,
        RadioButtonModule,
        SelectButtonModule,
        InputTextModule,
        FloatLabelModule,
        PasswordModule,
        ToastModule,
        CardModule
    ],
    exports: [],
    declarations: [
        LaboratoryComponent,
        DialogFormComponent,
    ],
    providers: [],
})
export class LaboratoryModule {}
