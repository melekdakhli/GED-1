// users.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms'; // Importez FormsModule
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [
    UsersComponent

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    UsersComponent
  ]
})
export class UsersModule { }
