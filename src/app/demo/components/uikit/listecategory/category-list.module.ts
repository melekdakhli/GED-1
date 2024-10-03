import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryListRoutingModule } from './categorylist-routing.module';
import { CategoryListComponent  } from './category-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CategoryListRoutingModule,
        HttpClientModule,
        TableModule,
        ReactiveFormsModule,

            PaginatorModule,
            ButtonModule,
            DialogModule,  // Ajoutez DialogModule ici
            InputTextModule

    ],
    declarations: [CategoryListComponent ]
})
export class CategoryListModule { }
