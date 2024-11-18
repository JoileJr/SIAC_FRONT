import { NgModule } from "@angular/core";

import { SharedModule } from "../../core/shared/shared.module";
import { InputTextModule } from "primeng/inputtext";
import { FloatLabelModule } from "primeng/floatlabel";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { ToastService } from "../../core/services/toastr/toast.service";
import { SingupComponent } from "./singup.component";
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
    declarations: [
        SingupComponent
    ],
    imports: [
        SharedModule,
        InputTextModule,
        FloatLabelModule,
        PasswordModule,
        ToastModule,
        CalendarModule,
        InputMaskModule,
        RadioButtonModule,
        SelectButtonModule,
    ],
    providers: [
        ToastService
    ],
})
export class SingUpModule { }
