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
import { HealthProfessionalComponent } from "./health-professional.component";
import { DialofFormComponent } from './dialof-form/dialof-form.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { HealthProfessionalRoutingModule } from "./heallth-professional-routing.module";
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        HealthProfessionalRoutingModule,
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
    declarations: [
        HealthProfessionalComponent,
        DialofFormComponent,
    ],
    providers: [],
})
export class HealthProfessionalModule {}
