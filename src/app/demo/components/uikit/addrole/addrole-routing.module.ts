import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddRoleComponent } from './addrole.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AddRoleComponent }
	])],
	exports: [RouterModule]
})
export class AddRoleRoutingModule { }
