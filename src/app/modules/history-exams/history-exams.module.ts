import { NgModule } from "@angular/core";
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from "../../core/shared/shared.module";
import { FormsModule } from "@angular/forms";
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { HistoryExamsComponent } from "./history-exams.component";
import { HistoryExamsRoutingModule } from "./history-exams-routing.module";
import { DropdownModule } from "primeng/dropdown";

@NgModule({
    imports: [
        HistoryExamsRoutingModule,
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
        CardModule,
        DropdownModule,
        ConfirmDialogModule
    ],
    exports: [],
    declarations: [
        HistoryExamsComponent,
    ],
    providers: [],
})
export class HistoryExamsModule {}
