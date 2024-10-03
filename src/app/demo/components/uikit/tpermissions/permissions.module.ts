import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsComponent } from './permissions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import both FormsModule and ReactiveFormsModule
import { PermissionsRoutingModule } from './permissions-routing.module'
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox'; // Ensure you import CheckboxModule

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
    declarations: [PermissionsComponent],
    imports: [
      CommonModule,
      TableModule,
      ButtonModule,
      DropdownModule,
      DialogModule
,
CheckboxModule, // Add this to import CheckboxModule

      RadioButtonModule,
    PermissionsRoutingModule,
    FormsModule, // Import FormsModule for template-driven forms
    ReactiveFormsModule // Import ReactiveFormsModule for reactive forms (used in this case)
  ]
})
export class PermissionsModule { }

