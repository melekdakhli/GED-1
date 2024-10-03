import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls : ['./login-component.css'],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
           // color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    form!: FormGroup;
    data: any;
    token :any;
 constructor(
      public layoutService: LayoutService,
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private router: Router// thzny mb3d mn3ml login in thzny lpage o5ra
    ) {
    }

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        email: '',
        password: ''
      });
    }

    submit(): void {
    this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
        withCredentials: true
      }).subscribe(res=>{ this.data =res;
       // console.log(res);
        this.token =this.data.access_token;
        const encodedToken = btoa(this.token);

        // Store the encoded token in local storage
        localStorage.setItem('token', encodedToken);
        this.router.navigate(['/dashbord']) });
    }
}
