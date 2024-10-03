






import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PermissionService } from 'src/app/demo/service/permission.service';
import { RolePermissions, Permission } from 'src/app/demo/service/permission.model';
import { SelectItem } from 'primeng/api';
import { User } from 'src/app/demo/service/user.model';
import { UserService } from 'src/app/demo/service/users.service';
import { Role, RoleService } from 'src/app/demo/service/Rol.Service';


@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions: RolePermissions[] = [];
  userNamesAsSelectItems: SelectItem[] = [];
  displayDialog: boolean = false;
  selectedPermissions: RolePermissions | null = null;
  permissionsForm: FormGroup;
  addDialogVisible: boolean = false;
  newPermissionForm: FormGroup;
  totalPermissions: number = 0;
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  roles: any;

  constructor(
    private permissionService: PermissionService,
    private userService: UserService,  // Assurez-vous que cette ligne est ajoutée
    private roleService:RoleService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUserNamesWithoutPermissions();
    this.loadPermissions();
    this.initializeForms();
    this.roleService.getRoles().subscribe(
      data => {
         this.roles = data.roles; // Assurez-vous que cette propriété correspond à la structure de réponse du backend.
         
     },
     error => {
         console.error('Error loading roles', error);
       
     }
  );
  }

  initializeForms(): void {
    this.permissionsForm = this.fb.group({
      create: [false, Validators.required],
      show: [false, Validators.required],
      delete: [false, Validators.required],
      modifier: [false, Validators.required],
      telech: [false, Validators.required]
    });

    this.newPermissionForm = this.fb.group({
      role_id: ['', Validators.required],
      create: [false, Validators.required],
      show: [false, Validators.required],
      delete: [false, Validators.required],
      modifier: [false, Validators.required],
      telech: [false, Validators.required]
    });
  }

  loadPermissions(event?: any): void {
    this.loading = true;
    const page = event ? (event.first / event.rows) + 1 : this.currentPage;
    this.permissionService.getPermissions().subscribe(
      data => {
        this.permissions = data;
        this.totalPermissions = data.length;
        this.loading = false;
      },
      error => {
        console.error('Error loading permissions', error);
        this.loading = false;
      }
    );
  }



  showEditDialog(permission: Permission): void {
    console.log('Permission passed to showEditDialog:', permission);

    if (!permission) {
      console.error('Permission object is undefined');
      return;
    }

    // Assurez-vous que permission contient toutes les propriétés nécessaires pour correspondre au type RolePermissions
    this.selectedPermissions = {
      id: permission.id,
      roleName: '', // Vous devrez obtenir cette valeur d'une manière appropriée.
      permissions: permission
    };

    this.permissionsForm.patchValue({
      create: permission.create === '1', // Utilisez la valeur directement sans 'permissions.'
      show: permission.show === '1',
      delete: permission.delete === '1',
      modifier: permission.modifier === '1',
      telech:permission.telech ==='1'
    });

    this.displayDialog = true;
  }


  saveRolePermissions(): void {
    if (this.selectedPermissions) {
      const updatedPermissions = this.permissionsForm.value;
      this.permissionService.updatePermissions(this.selectedPermissions.id, updatedPermissions).subscribe(
        () => {
          console.log('Permissions updated successfully');
          this.displayDialog = false;
          this.loadPermissions();
        },
        error => console.error('Failed to update permissions:', error)
      );
    }
  }


loadUserNamesWithoutPermissions(): void {
    this.userService.getUsers().subscribe((response: any) => {
      if (response && Array.isArray(response.admins)) {
        this.roles = response.admins;
      } else {
        console.error('The response is not in expected format:', response);
      }
    });
  }




 // Uncomment and modify as needed for adding new permissions
 saveNewPermissions(): void {
    if (this.newPermissionForm.valid) {
      const formValue = this.newPermissionForm.value;

      // Convertissez les valeurs boolean en chaînes de caractères 'true' ou 'false'
      const permissionData = {
        role_id: formValue.role_id,
        create: formValue.create ? '1' : '0',
        show: formValue.show ? '1' : '0',
        delete: formValue.update ? '1' : '0',
        modifier: formValue.modifier ? '1' : '0',
        telech: formValue.telech ? '1' : '0'
      };

console.log(permissionData);
      this.permissionService.addPermission(permissionData).subscribe(
        (response) => {
          console.log('New permissions added successfully', response);
          this.addDialogVisible = false;
          this.loadUserNamesWithoutPermissions(); // Refresh the list
          this.loadPermissions();
        },
        (error) => {
          console.error('Failed to add new permissions:', error);
        }
      );
    } else {
      console.error('Form is not valid', this.newPermissionForm);
    }
  }



  confirmDelete(permission: Permission): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette permission ?')) {
      this.deletePermission(permission);
    }
  }


  deletePermission(permission: Permission): void {
    this.permissionService.deletePermission(permission.id).subscribe(
      () => {
        console.log('Permission deleted successfully');
        // Mettre à jour la liste des permissions après la suppression
        this.loadPermissions();
      },
      error => {
        console.error('Failed to delete permission:', error);
      }
    );
  }

}

