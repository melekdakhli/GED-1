
import { Component, OnInit } from '@angular/core';
import {Department, DepartmentService } from 'src/app/demo/service/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';

@Component({
      selector: 'app-department-add',
      templateUrl: './department-add.component.html',
      styleUrls: ['./department-add.component.scss']
    })
    export class DepartmentAddComponent implements OnInit {
        nameDepartment: '';
        typeDepartment: '';
   // DepartmentTypes: string[] = ['Admin', 'Responsable bureau d\'ordre', 'Chefs', 'Sous-chefs', 'Simple agent'];
     user: any;
     DepartmentForm: FormGroup;

    constructor(private departmenService: DepartmentService ,
      private fb: FormBuilder) {
        this.DepartmentForm = this.fb.group({
          nameDepartment:'',
        });
      }

    ngOnInit(): void {

      const encodedToken = localStorage.getItem('token');

      // Decode the token
      const token = atob(encodedToken);
       this.user = jwtDecode(token);

    }


  }
