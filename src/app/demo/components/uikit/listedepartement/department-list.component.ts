import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DepartmentService, Department } from 'src/app/demo/service/department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  totalDepartments: number = 0;
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 5;
  displayEditDialog: boolean = false;
  departmentForm: FormGroup;
  DepartmentForm: FormGroup;

  selectedDepartmentName: string | null = null; // pour stocker le nom actuel du département à modifier
  selectedDepartmentId: number | null = null; // Ajoutez cette propriété
  showNewDepartmentDialog: boolean = false;
  
  constructor(private departmentService: DepartmentService,  private fb: FormBuilder) {
  
      this.DepartmentForm = this.fb.group({
        nom:'',
      });
  }

  ngOnInit(): void {
    this.loadDepartments();
    this.departmentForm = new FormGroup({
        nom: new FormControl('', Validators.required),
   
    });
  }
  onSaveDepartment() {
    this.departmentService.createDepartment(this.DepartmentForm.getRawValue()).subscribe({
      next: (role) => {
        console.log('dep created:', role);
        alert('Le dept a été ajouté avec succès!');
      },
      error: (error) => {
        console.error('Error creating dept:', error);
        alert('Erreur lors de la création du dept.');
      }
    });
  }
  loadDepartments(event?: any): void {
    this.loading = true;

    // Vérifiez si l'argument 'event' est fourni et déterminez la page courante en fonction de celui-ci.
    const page = event ? (event.first / event.rows) + 1 : this.currentPage;

    this.departmentService.getDepartments().subscribe(
      data => {
        this.departments = data.departments;
        this.totalDepartments = data.totalCount;
        this.loading = false;
      },
      error => {
        console.error('Error loading departments', error);
        this.loading = false;
      }
    );
  }


  onEditDepartment(department: Department): void {
    this.displayEditDialog = true;
    this.selectedDepartmentId = department.id;
    this.departmentForm.setValue({
      nom: department.nom,
     
    
    });
    console.log(department.nom);
  }


 
  onDeleteDepartment(department: Department): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce département ?')) {
        this.departmentService.deleteDepartment(department).subscribe(() => this.loadDepartments());
    }
}


  saveDepartment(): void {
    if (this.departmentForm.valid && this.selectedDepartmentId != null) {
      const updatedDepartment = {
        ...this.departmentForm.value,
        id: this.selectedDepartmentId
      };
      this.departmentService.updateDepartment(updatedDepartment).subscribe({
        next: () => {
          this.displayEditDialog = false;
          this.loadDepartments(); // Refresh the list of departments
        },
        error: (error) => {
          console.error('Error updating department', error);
        }
      });
    } else {
        console.error('Form is not valid or ID is not set');
    }
  }
}
