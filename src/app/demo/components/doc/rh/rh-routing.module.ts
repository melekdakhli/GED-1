import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RhComponent } from './rh.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RhComponent }
    ])],
    exports: [RouterModule]
})
export class rhRoutingModule { }
