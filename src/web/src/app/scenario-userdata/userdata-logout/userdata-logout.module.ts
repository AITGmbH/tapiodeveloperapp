import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LogoutRoutingModule } from "./userdata-logout-routing.module";
import { LogoutComponent } from "./userdata-logout.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, LogoutRoutingModule, SharedModule]
})
export class LogoutModule {}
