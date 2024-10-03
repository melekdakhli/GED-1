import { NgModule } from '@angular/core';
import { RegisterComponent } from "./register.component";
import { RegisterRoutingModule } from "./register-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RegisterService } from "./register.service";
import { HttpClientModule } from '@angular/common/http'; // Remplace HttpModule

@NgModule({
  imports: [
    RegisterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule // Remplace HttpModule
  ],
  declarations: [RegisterComponent],
  providers: [RegisterService]
})
export class RegisterModule { }
