import { NgModule } from "@angular/core";
import { ExamRoutingModule } from "./exam-routing.module";
import { ExamComponent } from "./exam.component";
import { DialogFormComponent } from './dialog-form/dialog-form.component';
import { MessagesModule } from "primeng/messages";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CardModule } from "primeng/card";
import { ToastModule } from "primeng/toast";
import { PasswordModule } from "primeng/password";
import { FloatLabelModule } from "primeng/floatlabel";
import { SelectButtonModule } from "primeng/selectbutton";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputMaskModule } from "primeng/inputmask";
import { CalendarModule } from "primeng/calendar";
import { DialogModule } from "primeng/dialog";
import { RatingModule } from "primeng/rating";
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { InputTextModule } from "primeng/inputtext";
import { SharedModule } from "../../core/shared/shared.module";
import { ExameSangueComponent } from './dialog-form/exame-sangue/exame-sangue.component';

@NgModule({
    imports: [
        ExamRoutingModule,
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
        ConfirmDialogModule,
        InputNumberModule,
        DropdownModule,
        MessagesModule
    ],
    exports: [],
    declarations: [ExamComponent, DialogFormComponent, ExameSangueComponent],
    providers: [],
})
export class ExamModule {}
