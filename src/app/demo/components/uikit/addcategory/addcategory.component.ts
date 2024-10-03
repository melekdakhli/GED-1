import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/demo/service/category.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
        nom: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const token = atob(encodedToken);
      this.user = jwtDecode(token);
    }
  }

  onSaveCategory() {
    if (this.categoryForm.invalid) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const categoryData = this.categoryForm.value; // Récupérez les données du formulaire
    this.categoryService.createCategorie(categoryData).subscribe({
      next: (category) => {
        console.log('Category added:', category);
        alert('La catégorie a été ajoutée avec succès!');
        this.categoryForm.reset();  // Réinitialise le formulaire après un succès
      },
      error: (error) => {
        console.error('Error adding category:', error);
        alert('Erreur lors de lajout de la catégorie. Veuillez réessayer.');
      }
    });
  }
}
