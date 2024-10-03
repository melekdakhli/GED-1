import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ReactiveFormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './changepassword.component';
import { changepasswordRoutingModule } from './changepassword-routing.module';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';



@NgModule({

  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,  
    InputTextModule,
    ReactiveFormsModule,
    PasswordModule,

    changepasswordRoutingModule
  ],  declarations: [
    ChangepasswordComponent
  ]
  ,
  exports: [
    ChangepasswordComponent
  ]
})
export class changepasswordModule { }
