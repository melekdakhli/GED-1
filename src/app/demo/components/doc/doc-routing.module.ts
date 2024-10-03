import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhComponent } from './rh/rh.component';
import { ClientsComponent } from './clients/clients.component';
import { TechniqueComponent } from './technique/technique.component';
import { FormationComponent } from './formation/formation.component';
import { FournisseurComponent } from './fournisseur/fournisseur.component';


@NgModule({
    imports: [RouterModule.forChild([
        {path: 'rh',  loadChildren: () => import('./rh/rh.module').then(m => m.rhModule)},
        {path: 'clients', loadChildren: () => import('./clients/clients.module').then(m => m.clientsModule)},
        {path: 'technique',  loadChildren: () => import('./technique/technique.module').then(m => m.techniqueModule)},
        {path: 'formation',  loadChildren: () => import('./formation/formation.module').then(m => m.formationtModule)},
        {path: 'fournisseur',  loadChildren: () => import('./fournisseur/fournisseur.module').then(m => m.FournisseurModule)},

       
    ])],
    exports: [RouterModule]
})
export class DocRoutingModule { }