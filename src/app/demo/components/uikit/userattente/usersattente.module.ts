// users.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  UsersattenteComponent } from './usersattente.component';
import {  UsersattenteRoutingModule } from './usersattente-routing.module';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    UsersattenteComponent

  ],
  imports: [
    CommonModule,
    UsersattenteRoutingModule,
    DialogModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TableModule, 

    ReactiveFormsModule

 ,
  ],
  exports: [
    UsersattenteComponent
  ]
})
export class UsersettenteModule { }
