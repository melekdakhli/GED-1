import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCategoryComponent } from './addcategory.component';
import { AddCategoryRoutingModule } from './addcategory-routting.module';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		AddCategoryRoutingModule,
        FormsModule ,

        ReactiveFormsModule

	],
	declarations: [AddCategoryComponent]
})
export class AddCategoryModule { }
