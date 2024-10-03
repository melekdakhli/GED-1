import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentAddComponent } from './department-add.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentAddRoutingModule } from './departmentadd-routing.module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    DepartmentAddRoutingModule,
    ReactiveFormsModule

  ],
  declarations: [
    DepartmentAddComponent
  ]
})
export class DepartmentAddModule { }
