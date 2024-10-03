import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeRoleComponent } from './listerole.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListeRoleComponent }
    ])],
    exports: [RouterModule]
})
export class ListeRoleRoutingModule { }
