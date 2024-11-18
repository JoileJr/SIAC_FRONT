import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastService } from './core/services/toastr/toast.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastModule } from "primeng/toast";
import { MessageService } from 'primeng/api';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        ToastModule,
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ToastService,
        MessageService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
