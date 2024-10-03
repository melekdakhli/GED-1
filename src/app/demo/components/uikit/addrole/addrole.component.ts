
import { Component, OnInit } from '@angular/core';
import {Role, RoleService } from 'src/app/demo/service/Rol.Service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';



@Component({
    selector: 'app-addrole',
    templateUrl: './addrole.component.html',
    styleUrls: ['./addrole.component.scss']
  })
  export class AddRoleComponent implements OnInit {
    user: any;
  // nameRole: ' ' ;
   // typeRole: '' ;

    roleForm: FormGroup;


    roleTypes: string[] = ['Admin', 'Responsable bureau d\'ordre', 'Chefs', 'Sous-chefs', 'Simple agent'];




    constructor(
      private roleService: RoleService,
      private fb: FormBuilder
    ) {
        this.roleForm = this.fb.group({
            nomRole: ['', Validators.required], // utilisez 'nomRole' au lieu de 'nameRole'
            typeRole: ['', Validators.required], // c'est correct
          });

    }

  ngOnInit(): void {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const token = atob(encodedToken);
      this.user = jwtDecode(token);
    }
  }

  onSaveRole() {
    if (this.roleForm.invalid) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const newRole = {
        nom: this.roleForm.value.nomRole,
        type: this.roleForm.value.typeRole,
        user_id: this.user.user_id.toString()
      };

    console.log(newRole);

    this.roleService.createRole(newRole).subscribe({
      next: (role) => {
        console.log('Role created:', role);
        alert('Le rôle a été ajouté avec succès!');
      },
      error: (error) => {
        console.error('Error creating role:', error);
        alert('Erreur lors de la création du rôle.');
      }
    });
  }
}
