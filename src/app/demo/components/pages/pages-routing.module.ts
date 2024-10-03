import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'crud', loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        // { path: 'listedocuments', loadChildren: () => import('./listedocuments/liste-document.module').then(m => m.DocumentModule) },
        // { path: 'listerole', loadChildren: () => import('./listerole/listerole.module').then(m => m.ListeRoleModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
