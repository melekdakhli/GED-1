// import { NgModule } from '@angular/core';
// import { RouterModule } from '@angular/router';
// //import { ListeDocumentComponent } from './liste-document.component';

// @NgModule({
//     imports: [RouterModule.forChild([
//        // { path: '', component: ListeDocumentComponent }
//     ])],
//     exports: [RouterModule]
// })
// export class ListeDocumentRoutingModule { }




import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListeDocumentComponent } from './liste-document.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: ListeDocumentComponent }
    ])],
    exports: [RouterModule]
})
export class ListeDocumentRoutingModule { }
