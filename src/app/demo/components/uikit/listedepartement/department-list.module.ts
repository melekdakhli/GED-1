import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentListComponent } from './department-list.component';
import { DepartmentListRoutingModule } from './departmentlist-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DepartmentListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
        PaginatorModule,
        ButtonModule,
        DialogModule,  // Ajoutez DialogModule ici
        InputTextModule,
        ReactiveFormsModule,

    DepartmentListRoutingModule
  ]
})
export class DepartmentListModule { }
