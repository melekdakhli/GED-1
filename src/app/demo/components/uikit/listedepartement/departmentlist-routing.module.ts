import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentListComponent } from './department-list.component';

// const routes: Routes = [
//   {
//     path: 'departments',
//     component: DepartmentListComponent
//   }
// ];

@NgModule({
    imports: [
        RouterModule.forChild([
		{ path: '', component: DepartmentListComponent }
	])],
  exports: [RouterModule]
})
export class DepartmentListRoutingModule { }
