import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormationComponent } from './formation.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: FormationComponent }
    ])],
    exports: [RouterModule]
})
export class formationRoutingModule { }
