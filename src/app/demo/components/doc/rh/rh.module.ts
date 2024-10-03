



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { DocumentService } from 'src/app/demo/service/document1.service';
//import { FilterPipe } from '../../uikit/docuformation/filter.pipe'; // Importez le pipe ici

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';


import { formationService } from 'src/app/demo/service/formation.service';

import { RhComponent } from './rh.component';
//import { FilterPipe } from '../../uikit/listedocuments/filter.pipe';
import { rhRoutingModule } from './rh-routing.module';
import { MessageService } from 'primeng/api';
import { rhService } from 'src/app/demo/service/rh.service';

@NgModule({
  imports: [

    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,

    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    CommonModule,
    CalendarModule,
    
    rhRoutingModule,
 
    ReactiveFormsModule // Import ReactiveFormsModule for reactive forms (used in this case)
],
  declarations: [RhComponent],
  providers: [rhService,MessageService]
})
export class rhModule { }


