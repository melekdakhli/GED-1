import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from './addrole.component';
import { AddRoleRoutingModule } from './addrole-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { FormsModule } from '@angular/forms'; // Ajouté pour ngModel

import { ReactiveFormsModule } from '@angular/forms';  // Import for reactive forms

@NgModule({
	imports: [
		CommonModule,
		AddRoleRoutingModule,
        FormsModule ,// Ajouté pour ngModel

        ReactiveFormsModule  // Make sure to import ReactiveFormsModule

	],
	declarations: [AddRoleComponent]
})
export class AddRoleModule { }
