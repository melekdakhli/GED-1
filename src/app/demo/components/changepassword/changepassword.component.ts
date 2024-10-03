import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { changepasswordService } from 'src/app/demo/service/changepassword.service';
import { TokenService } from '../../service/token.service';



@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.scss'
})
export class ChangepasswordComponent {
  users: any;
  passwordForm: FormGroup;
  id:any;
  
  constructor(private changepasswordService:changepasswordService  ,private fb: FormBuilder,private _TokenService:TokenService){
   
    
    this.users =this. _TokenService.gettoken();
    this.id=this.users.user_id
  }

  ngOnInit(): void {

    this.passwordForm = this.fb.group({
      Passwordchange: [''], // utilisez 'nomRole' au lieu de 'nameRole'
      Passwordconfirmation: [''], // c'est correct
    });
  }
  passwordMatchValidator(passwordForm: FormGroup) {
    const newPasswordControl = passwordForm.get('Passwordchange');
    const confirmPasswordControl = passwordForm.get('Passwordconfirmation');

    if (newPasswordControl && confirmPasswordControl) {
      if (newPasswordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }
  
updatepassword(){
  const formData = {

    password: this.passwordForm.value.Passwordconfirmation.toString(),
  };
  console.log(this.passwordForm.getRawValue());
  this.changepasswordService.updatePassword(this.id,formData).subscribe(
    (res: any) => {
  console.log(formData); // Assurez-vous que cette propriété correspond à la structure de réponse du backend.
       
   },
   error => {
       console.error('Error loading roles', error);
   });  
}


}
