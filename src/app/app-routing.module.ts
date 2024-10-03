// import { RouterModule } from '@angular/router';
// import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
// import { AppLayoutComponent } from "./layout/app.layout.component";
// import { LoginComponent } from './demo/components/auth/login/login.component';
// import { RegisterComponent } from './demo/components/register/register.component';
// import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
// import { AddUserComponent } from './demo/components/uikit/adduser/adduser.component';

// @NgModule({
//     imports: [

//         RouterModule.forRoot([
//             {
//                 path: '', component: AppLayoutComponent,

//                 children: [

//                     { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
//                     { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
//                     { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
//                     { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
//                     { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
//                 ]
//             },
//             { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
//             //{path: 'role' , loadChildren: ()=> import('./demo/components/role/role.module').then(m => m.RoleModule)},
//             {path : 'registre' , loadChildren:()=> import('./demo/components/register/register.module').then(m => m.RegisterModule)},
//            // {path : 'dashbord' , loadChildren:()=> import('./demo/components/dashboard/dashboard-routing.module').then(m=> m.DashboardsRoutingModule)},
//             { path: 'landing', loadChildren: () => import('./demo/components/uikit/listecategory/category-list.module').then(m => m.CategoryListModule) },
//             { path: 'notfound', component: NotfoundComponent },
//             { path: 'register', component: RegisterComponent },
//           // { path: 'adduser', component: AddUserComponent },


//             { path: '**', redirectTo: '/notfound' },
//         ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
//     ],
//     exports: [RouterModule]
// })
// export class AppRoutingModule {
// }




import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/auth/login/login.component';
import { RegisterComponent } from './demo/components/register/register.component';
import { DashboardComponent } from './demo/components/dashboard/dashboard.component';
import {AuthGuard} from './auth.gurard';
import { ChangepasswordComponent } from './demo/components/changepassword/changepassword.component';
import { RhComponent } from './demo/components/doc/rh/rh.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
           { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

            {
                path: '', component: AppLayoutComponent, canActivate: [AuthGuard],

                children: [
                    {path:'doc',loadChildren: () => import('./demo/components/doc/doc.module').then(m => m.DocModule)},
                    { path: 'changepassword', loadChildren:()=> import('./demo/components/changepassword/changepassword.module').then(m => m.changepasswordModule)},
                    { path: 'dashbord', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule)},
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)},
                   // { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    //{ path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            //{path: 'role' , loadChildren: ()=> import('./demo/components/role/role.module').then(m => m.RoleModule)},
            {path : 'registre' , loadChildren:()=> import('./demo/components/register/register.module').then(m => m.RegisterModule)},
           // {path : 'dashbord' , loadChildren:()=> import('./demo/components/dashboard/dashboard-routing.module').then(m=> m.DashboardsRoutingModule)},
           // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'register', component: RegisterComponent },

            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
