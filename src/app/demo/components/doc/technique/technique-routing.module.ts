import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TechniqueComponent } from './technique.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: TechniqueComponent }
    ])],
    exports: [RouterModule]
})
export class techniqueRoutingModule { }
