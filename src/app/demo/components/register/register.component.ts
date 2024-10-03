import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RegisterService} from "./register.service";
import { HttpClient } from '@angular/common/http';

@Component({

  selector:'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  public form:FormGroup;
  public fname:AbstractControl;
  public lname:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public cpassword:AbstractControl;
  public submitted:boolean = false;
  public passwordVisibility: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fname: '',
      lname: '',
      email: '',
      cin: '',
      nbr_tel: '',
      password: '',
      cpassword: '',
      status:'non'

    });
  }

  Submit(): void {
    console.log(this.form.getRawValue())
    this.http.post('http://localhost:8000/api/attente', this.form.getRawValue()).subscribe(res =>{this.router.navigate(['/auth/login'])});
  }
  public togglePasswordVisibility(): void {
    this.passwordVisibility = !this.passwordVisibility;
  }

}
