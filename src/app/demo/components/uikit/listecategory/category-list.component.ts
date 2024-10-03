import { Component, OnInit } from '@angular/core';
import { Categorie, CategoryService } from 'src/app/demo/service/category.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: Categorie[] = [];
  totalCategories: number = 0;
  loading: boolean = false;
  currentPage: number =1 ;
  pageSize: number = 5;
  displayEditDialog: boolean = false;
  showNewcategorieDialog: boolean = false;

  selectedCategorieName: string | null = null;
  categorieForm: FormGroup;
  selectedCategorieId: number | null = null; // Ajoutez cette propriété
  CategorieForm:FormGroup ;
 
  constructor(private categoryService: CategoryService,  private fb: FormBuilder) {
    this.CategorieForm = this.fb.group({
      nom:'',
    });

  }

  ngOnInit(): void {
    this.loadCategories();

    this.categorieForm = new FormGroup({
        nom: new FormControl('', Validators.required),

    });


  }
  onSaveCategory() {
    if (this.CategorieForm.invalid) {
      alert('Veuillez remplir tous les champs requis.');
      return;
    }

    const categoryData = this.CategorieForm.value; // Récupérez les données du formulaire
    this.categoryService.createCategorie(categoryData).subscribe({
      next: (category) => {
        console.log('Category added:', category);
        alert('La catégorie a été ajoutée avec succès!');
        this.CategorieForm.reset();  // Réinitialise le formulaire après un succès
      },
      error: (error) => {
        console.error('Error adding category:', error);
        alert('Erreur lors de lajout de la catégorie. Veuillez réessayer.');
      }
    });
  }

  loadCategories(event?: any): void {
    this.loading = true;
    const page = event ? (event.first / event.rows) + 1 : this.currentPage;
    // Implement pagination if necessary
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
        this.totalCategories = data.length; // Adjust based on API response
        this.loading = false;
      },
      error => {
        console.error('Error loading categories', error);
        this.loading = false;
      }
    );
  }

  onEditCategorie(categorie: Categorie): void {
    this.displayEditDialog = true;
    this.selectedCategorieId = categorie.id;
    this.categorieForm.setValue({
      nom: categorie.nom,
    });
  }




  onDeleteCategorie(categorie: Categorie): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.categoryService.deleteCategorie(categorie).subscribe(() => this.loadCategories());
    }
  }

  saveCategorie(): void {
    if (this.categorieForm.valid && this.selectedCategorieId != null) {
      const updatedCategorie = {
        ...this.categorieForm.value,
        id: this.selectedCategorieId
      };
      this.categoryService.updateCategorie(updatedCategorie).subscribe({
        next: () => {
          this.displayEditDialog = false;
          this.loadCategories(); // Refresh the list of departments
        },
        error: (error) => {
          console.error('Error updating category', error);
        }
      });
    } else {
        console.error('Form is not valid or ID is not set');
    }
  }






}
