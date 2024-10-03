import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserRoutingModule } from './adduser-routing.module';
import { AddUserComponent } from './adduser.component';

@NgModule({
  declarations: [AddUserComponent],
  imports: [CommonModule, AddUserRoutingModule, ReactiveFormsModule],
})
export class AddUserModule { }
