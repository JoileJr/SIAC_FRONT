import { NgModule } from '@angular/core';
import { PatientComponent } from './patient.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../core/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { PatientRoutingModule } from './patient-routing.module';
import { DialofFormComponent } from './dialof-form/dialof-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';

@NgModule({
    imports: [
        PatientRoutingModule,
        TableModule,
        SharedModule,
        FormsModule,
        TagModule,
        RippleModule,
        ToastModule,
        SharedModule,
        InputTextModule,
        FloatLabelModule,
        PasswordModule,
        CalendarModule,
        InputMaskModule,
        RadioButtonModule,
        SelectButtonModule,
        DialogModule,
        CardModule
    ],
    exports: [],
    declarations: [PatientComponent, DialofFormComponent],
    providers: [],
})
export class PatientModule {}
