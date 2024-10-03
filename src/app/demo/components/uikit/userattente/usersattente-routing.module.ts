import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersattenteComponent } from './usersattente.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: UsersattenteComponent },

	])],
	exports: [RouterModule]
})
export class UsersattenteRoutingModule { }
