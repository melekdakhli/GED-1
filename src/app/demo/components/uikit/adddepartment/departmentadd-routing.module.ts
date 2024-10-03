import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {DepartmentAddComponent  } from './department-add.component';


@NgModule({
	imports: [
        RouterModule.forChild([
		{ path: '', component: DepartmentAddComponent }
	])],
	exports: [RouterModule]
})
export class DepartmentAddRoutingModule { }
