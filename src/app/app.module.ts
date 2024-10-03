import { NgModule } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { CommonModule } from '@angular/common';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';  // Import CommonModule
import { AuthInterceptor } from './demo/components/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';



@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,CommonModule,DialogModule,FormsModule,ReactiveFormsModule, CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
      
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        {
            provide :HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi : true
          }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
