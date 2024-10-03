import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/demo/service/users.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { DepartmentService, Department } from 'src/app/demo/service/department.service';
import { Role, RoleService } from 'src/app/demo/service/Rol.Service';



@Component({
  selector: 'app-users',
  templateUrl: './usersattente.component.html',
  styleUrls: ['./usersattente.component.scss'],
  providers: [MessageService]
})
export class UsersattenteComponent implements OnInit {
  users: any[] = [];
  newUserForm: FormGroup;
  editUserForm: FormGroup;
  showNewUserDialog: boolean = false;
  showEditUserDialog: boolean = false;
  roles:any;
  departments:any;
  pageSize: number = 5;
 

  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private http: HttpClient,
    private messageService: MessageService,
    private departmentService:DepartmentService,
    private roleService:RoleService,

  ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.newUserForm = this.fb.group({
        cin: ['', Validators.required],
        fname: ['', Validators.required],
        lname: ['', Validators.required],
      nbr_tel: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      role_id: ['', Validators.required],
      department_id: ['', Validators.required],
      status:'oui'
    }
  );
  this.departmentService.getDepartments().subscribe(
    data => {
      this.departments = data.departments;
     
    },
    error => {
      console.error('Error loading departments', error);
     
    }
  );
  this.roleService.getRoles().subscribe(
    data => {
       this.roles = data.roles; // Assurez-vous que cette propriété correspond à la structure de réponse du backend.
       
   },
   error => {
       console.error('Error loading roles', error);
     
   }
);

 /* this.http.get('http://localhost:8000/api/showR', {withCredentials: true}).subscribe(res=>{ this.role=res ;
    console.log(this.role)
  } );
  this.http.get('http://localhost:8000/api/showDP', {withCredentials: true}).subscribe(res=>{ this.departments=res ;
  console.log(this.departments)
} );*/

    this.editUserForm = this.fb.group({
        id: ['', Validators.required], // Add this line
        cin: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nbr_tel: ['', Validators.required],
      role_id:'',
      department_id:'',
      status:''
    });
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data; // Adjust according to your API response
        console.log(this.users);
      },
      error => {
        console.error(error);
        // Handle error
      }
    );
  }

  ajouterNouvelUtilisateur() {
    console.log(this.newUserForm.value);
    if (this.newUserForm.valid) {
      this.userService.addUser(this.newUserForm.value).subscribe(
        response => {
          this.loadUsers();
          
          this.showNewUserDialog = false;
          this.newUserForm.reset(); // Ajoutez cette ligne pour réinitialiser le formulaire

          this.messageService.add({severity: 'success', summary: 'User Added', detail: 'The new user has been added successfully.'});
        },
        error => {
          console.error('Failed to add user:', error);
          this.messageService.add({severity: 'error', summary: 'Add Error', detail: 'Failed to add new user.'});
        }
      );
    }
  }

  voirDetails(user: any) {
    console.log('User Details:', user);
  }

  editerInformations(user: any) {
    // Add user ID to the form values here
    this.editUserForm.patchValue({
        ...user,
        id: user.id // Assuming 'user' object has 'id' field
      });

    this.showEditUserDialog = true;
  }

  modifierUtilisateur() {
    if (this.editUserForm.valid) {
      const id = this.editUserForm.get('id').value; // Make sure this line gets the id correctly

      this.userService.updateUser1(id, this.editUserForm.value).subscribe(
    
        response => {
          this.loadUsers();
          console.log( this.editUserForm.getRawValue())
          this.showEditUserDialog = false;
          this.messageService.add({severity: 'success', summary: 'User Updated', detail: 'User information has been updated successfully.'});
        },
        error => {
          console.error('Failed to update user:', error);
          this.messageService.add({severity: 'error', summary: 'Update Error', detail: 'Failed to update user information.'});
        }
      );
    }
  }

  supprimerUtilisateur(id: number) {
    this.userService.deleteUser(id).subscribe(
      response => {
        // Remove the user from the local array as well to update the UI instantly
        this.users = this.users.filter(user => user.id !== id);
        this.messageService.add({severity: 'success', summary: 'User Deleted', detail: 'User has been deleted successfully.'});
      },
      error => {
        console.error('Failed to delete user:', error);
        this.messageService.add({severity: 'error', summary: 'Delete Error', detail: 'Failed to delete user.'});
      }
    );
  }


  voirVersionImpression() {
    window.print();
  }

  telechargerListeExcel() {
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.users.map(user => ({
      CIN: user.cin,
      Nom: user.nom,
      Prénom: user.prenom,
      Email: user.email,
      'Numéro de Téléphone': user.nbr_tel
    })));
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout: Blob = new Blob([XLSX.write(wb, {bookType: 'xlsx', type: 'array'})], {type: 'application/octet-stream'});
    saveAs(wbout, 'UsersList.xlsx');
  }
}
