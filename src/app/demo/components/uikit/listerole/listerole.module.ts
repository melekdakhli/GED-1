// listerole.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeRoleRoutingModule } from './listerole-routing.module';
import { ListeRoleComponent } from './listerole.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms'; // Importation de ReactiveFormsModule

@NgModule({
    declarations: [ListeRoleComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ListeRoleRoutingModule,
        TableModule,
        PaginatorModule,
        ButtonModule,
        DialogModule, // Ajoutez DialogModule ici
        ReactiveFormsModule ,// Ajout de ReactiveFormsModule aux imports

        InputTextModule
    ]
})
export class ListeRoleModule {}
