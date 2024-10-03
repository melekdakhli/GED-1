import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {jwtDecode} from 'jwt-decode';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenService } from './service/token.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    http: any;
    user: any;
   

    constructor(public layoutService: LayoutService, private tokenService: TokenService) {    this.user = this.tokenService.gettoken();
        // console.log(this.user);
    }
    logout(): void {
     localStorage.removeItem('token');
      }
     
    }