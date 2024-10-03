import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([

        { path: 'users', data: { breadcrumb: 'Users' }, loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
        { path: 'usersattente', data: { breadcrumb: 'Usersattente' }, loadChildren: () => import('./userattente/usersattente.module').then(m => m.UsersettenteModule) },

        { path: 'listedepartment', data: { breadcrumb: 'Liste Departement' }, loadChildren: () => import('./listedepartement/department-list.module').then(m => m.DepartmentListModule) },
      //  { path: 'adddepartment', data: { breadcrumb: 'Add Department' }, loadChildren: () => import('./adddepartment/department-add.module').then(m => m.DepartmentAddModule) },
      //  { path: 'addrole', data: { breadcrumb: 'Add Role' }, loadChildren: () => import('./addrole/addrole.module').then(m => m.AddRoleModule) },
        { path: 'calendar', data: { breadcrumb: 'Calendar' }, loadChildren: () => import('./calendar/filedemo.module').then(m => m.FileDemoModule) },
        { path: 'permissions', data: { breadcrumb: 'Permissions' }, loadChildren: () => import('./tpermissions/permissions.module').then(m => m.PermissionsModule) },
       // { path: 'addcategory', data: { breadcrumb: 'Add Category' }, loadChildren: () => import('./addcategory/addcategory.module').then(m => m.AddCategoryModule) },

        { path: 'listedocuments',data: { breadcrumb: 'Liste Documents'} ,loadChildren: () => import('./listedocuments/liste-document.module').then(m => m.DocumentModule) },
        { path: 'listerole',data: { breadcrumb: 'Liste Role'} ,loadChildren: () => import('./listerole/listerole.module').then(m => m.ListeRoleModule) },
        { path: 'listecategory',data: { breadcrumb: 'Liste Category'} ,loadChildren: () => import('./listecategory/category-list.module').then(m => m.CategoryListModule) },
        { path: 'charts', data: { breadcrumb: 'Charts' }, loadChildren: () => import('./charts/chartsdemo.module').then(m => m.ChartsDemoModule) },
        { path: 'formlayout', data: { breadcrumb: 'Form Layout' }, loadChildren: () => import('./formlayout/formlayoutdemo.module').then(m => m.FormLayoutDemoModule) },
        { path: 'table', data: { breadcrumb: 'Table' }, loadChildren: () => import('./table/tabledemo.module').then(m => m.TableDemoModule) },
        { path: 'adduser', data: { breadcrumb: '' }, loadChildren: () => import('./adduser/adduser.module').then(m => m.AddUserModule) },

        //{ path: 'formation',data: { breadcrumb: 'formation'} ,loadChildren: () => import('../doc/formation/formation.module').then(m => m.formationtModule) },

        { path: '**', redirectTo: '/notfound' }




    ])],
    exports: [RouterModule]
})
export class UIkitRoutingModule { }
