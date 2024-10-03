import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddCategoryComponent } from './addcategory.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AddCategoryComponent }
	])],
	exports: [RouterModule]
})
export class AddCategoryRoutingModule { }
