import { NgModule } from "@angular/core";
import { AvatarModule } from 'primeng/avatar';
import { TopbarComponent } from "./topbar.component";
import { SharedModule } from "../../core/shared/shared.module";
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from "primeng/toast";
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
    exports: [TopbarComponent],
    declarations: [TopbarComponent],
    imports: [
        SharedModule,
        AvatarModule,
        MenubarModule,
        TabMenuModule, 
        ToastModule 
    ],
})
export class TopbarModule {}
