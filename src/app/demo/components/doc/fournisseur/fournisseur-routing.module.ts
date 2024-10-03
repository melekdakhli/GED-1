import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FournisseurComponent } from './fournisseur.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FournisseurComponent }
    ])],
    exports: [RouterModule]
})
export class FournisseurRoutingModule { }
