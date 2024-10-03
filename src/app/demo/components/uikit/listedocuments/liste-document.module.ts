



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ListeDocumentRoutingModule } from './listedocument-routing.module';
import { ListeDocumentComponent } from './liste-document.component';
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
import { FilterPipe } from './filter.pipe'; // Importez le pipe ici

import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';






@NgModule({
  imports: [

    TableModule,
    FileUploadModule,
    FormsModule,
    ButtonModule,
    OverlayPanelModule,
    MultiSelectModule,
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
    ListeDocumentRoutingModule,
    ReactiveFormsModule // Import ReactiveFormsModule for reactive forms (used in this case)


  ],
  declarations: [
    ListeDocumentComponent,
    FilterPipe // Déclarez le pipe ici

],
  providers: [DocumentService]
})
export class DocumentModule { }


