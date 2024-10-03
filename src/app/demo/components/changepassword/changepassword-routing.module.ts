import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';



@NgModule({
    imports: [
        RouterModule.forChild([
		{ path: '', component: ChangepasswordComponent }
	])],
  exports: [RouterModule]
})
export class changepasswordRoutingModule { }