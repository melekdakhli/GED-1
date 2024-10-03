


// listerole.component.ts
import { Component, OnInit } from '@angular/core';
import { Role, RoleService } from 'src/app/demo/service/Rol.Service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-liste-role',
    templateUrl: './listerole.component.html',
    styleUrls: ['./listerole.scss']
})
export class ListeRoleComponent implements OnInit {
    roles: Role[] = [];
    totalRoles: number = 0;
    loading: boolean = false;
    currentPage: number = 1;
    pageSize: number = 5;
    roleForm: FormGroup;
    displayEditDialog: boolean = false;
    showNewroleDialog: boolean = false;

    selectedRoleId: number | null = null; // Ajoutez cette propriété
    RoleForm:FormGroup;
     // Ajoutez cette ligne pour déclarer selectedRole
     //selectedRole: Role | null = null; // Initialisez selectedRole à null






    constructor(private roleService: RoleService, private fb: FormBuilder) {
      
          this.RoleForm = this.fb.group({
            nom:'',
          });}


    ngOnInit(): void {
        this.loadRoles();

        this.roleForm = new FormGroup({
            nom: new FormControl('', Validators.required),
          
        });
    }
    onSaveRole() {
    
  console.log(this.RoleForm.getRawValue());
    
  
      this.roleService.createRole(this.RoleForm.getRawValue()).subscribe();
    }


 loadRoles(event?: any): void {
    this.loading = true;
    const page = event ? (event.first / event.rows) + 1 : this.currentPage;
    this.roleService.getRoles().subscribe(
         data => {
            this.roles = data.roles; // Assurez-vous que cette propriété correspond à la structure de réponse du backend.
            this.totalRoles = data.totalCount; // Assurez-vous que cette propriété correspond à la structure de réponse du backend.
            this.loading = false;
        },
        error => {
            console.error('Error loading roles', error);
            this.loading = false;
        }
    );
}



onEditRole(role: Role): void {
    this.displayEditDialog = true;
    this.selectedRoleId = role.id;
    this.roleForm.setValue({
      nom: role.nom,
      type: role.type
    });
    //this.selectedRole = {...role};
}


    // saveRole(): void {
    //     if (this.selectedRole) {
    //         this.roleService.updateRole(this.selectedRole).subscribe({
    //             next: () => {
    //                 this.displayEditDialog = false;
    //                 this.loadRoles(); // Refresh the list
    //             },
    //             error: (error) => {
    //                 console.error('Erreur lors de la mise à jour du rôle', error);
    //             }
    //         });
    //     }
    // }

    saveRole(): void {
        if (this.roleForm.valid && this.selectedRoleId != null) {
          const updatedRole = {
            ...this.roleForm.value,
            id: this.selectedRoleId
          };
          this.roleService.updateRole(updatedRole).subscribe({
            next: () => {
              this.displayEditDialog = false;
              this.loadRoles(); // Refresh the list of departments
            },
            error: (error) => {
              console.error('Error updating role', error);
            }
          });
        } else {
            console.error('Form is not valid or ID is not set');
        }
      }

      onDeleteRole(role: Role): void {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
          this.roleService.deleteRole(role).subscribe(() => this.loadRoles());
        }
      }
    // onDeleteRole(role: Role): void {
    //     if (confirm('Êtes-vous sûr de vouloir supprimer ce rôle ?')) {
    //         //this.roleService.deleteRole(role.nom).subscribe(() => this.loadRoles());
    //     }
    // }
}
