// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { FileUploadModule } from 'primeng/fileupload';
// import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { CalendarModule, DateAdapter } from 'angular-calendar';
// import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; // Importez une implémentation de DateAdapter

// import { FileDemoRoutingModule } from './filedemo-routing.module';
// import { FileDemoComponent } from './filedemo.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @NgModule({
//   imports: [
//     CommonModule,
//     FormsModule,
//     FileUploadModule,
//     NgbModalModule,
//     CalendarModule.forRoot({
//       provide: DateAdapter,
//       useFactory: adapterFactory,
//     }),
//     FileDemoRoutingModule,
//     //BrowserAnimationsModule,

//   ],
//   declarations: [FileDemoComponent],
//   exports: [FileDemoComponent],
// })
// export class FileDemoModule {}





import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'; // Importez une implémentation de DateAdapter

import { FileDemoRoutingModule } from './filedemo-routing.module';
import { FileDemoComponent } from './filedemo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FileDemoRoutingModule,
    //BrowserAnimationsModule,

  ],
  declarations:[FileDemoComponent],
  exports: [FileDemoComponent],
})
export class FileDemoModule {}
