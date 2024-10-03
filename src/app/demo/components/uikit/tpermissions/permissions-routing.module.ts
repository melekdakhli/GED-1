import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionsComponent } from './permissions.component';



@NgModule({
    imports: [
        RouterModule.forChild([
		{ path: '', component: PermissionsComponent }
	])],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
