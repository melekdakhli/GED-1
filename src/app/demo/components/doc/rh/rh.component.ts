import { Component } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Document } from 'src/app/demo/api/document';
import { MessageService } from 'primeng/api';
import {  FournisseurService} from 'src/app/demo/service/fournisseur.service';
import { CategoryService } from 'src/app/demo/service/category.service';
import { SelectItem } from 'primeng/api';

import { AuthService } from 'src/app/demo/service/auth.service';  // Assurez-vous que ce service est bien configuré pour récupérer les informations utilisateur

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { TokenService } from 'src/app/layout/service/token.service';
import { ElasticsearchService } from 'src/app/demo/service/elasticsearch.service';
import { rhService } from 'src/app/demo/service/rh.service';

@Component({
  selector: 'app-rh',
  templateUrl: './rh.component.html',
  styleUrl: './rh.component.scss'
})
export class RhComponent {



    // @ViewChild('filter') filter!: ElementRef;

    documentDialog: boolean = false;
    viewDocumentDialog: boolean = false;
    importDocumentDialog: boolean = false;
    deleteDocumentDialog: boolean = false;
    deleteDocumentsDialog: boolean = false;
    documents: Document[] = [];
    document: Document = {};
    selectedDocuments: Document[] = [];
    selectedDocument: Document = {}; // Assurez-vous que cette propriété est utilisée correctement dans le HTML
    submitted: boolean = false;
    cols: any[];
    filteredDocuments: Document[] = [];
    rowsPerPageOptions = [5, 10, 20];
    categories: SelectItem[] = [];
    DocumentForm: FormGroup;
    newDocumentForm: FormGroup; // Définir la propriété manquante
    doc: any;
    displayEditDialog: boolean = false;
    selectedDocumentId: number | null = null; // Ajoutez cette propriété

    previewDocumentUrl: SafeResourceUrl | null = null;
    users:any;
    newDocument:FormGroup;

    availableFormats = ['PDF', 'DOCX', 'TXT']; // Les formats disponibles pour le téléchargement
    selectedFormat: string; // Le format sélectionné par l'utilisateur
    user: any;
    searchText: string = '';
  searchResults: any[] = [];
  doc1: any[] = [];
  selectedOption
    admins: any;
    permissions: any;
  

    constructor(
        private documentService: rhService,
        private messageService: MessageService,
        private categoryService: CategoryService,
        private authService: AuthService,
       private esService: ElasticsearchService,
        private sanitizer: DomSanitizer,
        private http: HttpClient,
        private _TokenService:TokenService,


        private fb: FormBuilder
    ) {
        this.http.get<any>('http://localhost:8000/api/index1', { withCredentials: true }).subscribe(
    (res: any) => {
        this.admins = res;
        console.log(this.admins);
      },
      err => {
        console.error('Error fetching users data:', err);
      }
    );
this.http.get<any>('http://localhost:8000/api/showP', { withCredentials: true }).subscribe(
    (res: any) => {
        this.permissions = res;
        console.log(this.permissions);
      },
      err => {
        console.error('Error fetching users data:', err);
      }
    );
this.user =this. _TokenService.gettoken();
    }
    ngOnInit(): void {

        this.selectedFormat = this.availableFormats[0]; // Sélectionnez par défaut le premier format

        this.loadCategories();
        this.loadDocuments();

        this.user =this. _TokenService.gettoken();
     

        this.DocumentForm = this.fb.group({
            name: ['', Validators.required],
            categorie: ['', Validators.required],
            creationDate: ['', Validators.required],
            taille: ['', Validators.required],
            motcle: ['', Validators.required],
            user_id: this.user.user_id.toString()


        });
        

        this.newDocumentForm = this.fb.group({
            file: [null, Validators.required],
            name: ['', Validators.required],
            categorie: ['', Validators.required],
            creationDate: ['', Validators.required],
            taille: ['', Validators.required],
            motcle: ['', Validators.required],
            user_id: this.user.user_id.toString()

            

        });
        this.doc1 = [
            { id: 'pdf', nom: 'PDF' },
            { id: 'docx', nom: 'DOCX' },
            { id: 'png', nom: 'PNG' },
            // Ajoutez d'autres options au besoin
          ];
     

    }
 
    searchDocumentsWithElasticsearch() {
        if (this.searchText.trim() !== '') {
            const query = {
                query: {
                    match: {
                        "motcle": this.searchText
                    }
                }
            };
            this.esService.search('test', query).subscribe({
                next: (response) => {
                    this.searchResults = response.hits.hits.map(hit => hit._source);
                    console.log(this.searchResults);
                },
                error: (err) => {
                    console.error('Erreur lors de la recherche :', err);
                    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la recherche. Vérifiez la connexion à Elasticsearch.' });
                
                }
            });
        } else {
            this.searchResults = []; // Réinitialisez les résultats de la recherche si le champ est vide
        }
    }
    // onSearchInputChange(event: any) {
    //     const inputText = event.target.value;
    //     if (inputText.trim() !== '') {
    //         const apiUrl = 'http://127.0.0.1:8000/api/searchDocuments'; // Remplacez avec votre URL d'API
    //         this.http.post(apiUrl, { query: inputText }).subscribe(
    //             (response: any) => {
    //                 this.searchResults = response.results;
    //                 console.log(this.searchResults);
    //             },
    //             (error) => {
    //                 console.error('Erreur lors de la recherche :', error);
    //             }
    //         );
    //     } else {
    //         this.searchResults = []; // Réinitialisez les résultats de la recherche si le champ est vide
    //     }
    // }
    
    



    loadCategories(): void {
        this.categoryService.getCategories().subscribe((res: any) => {
                     this.doc = res;
                   });
      }

      loadDocuments() {
        this.documentService.getDocuments().subscribe(
          (documents: Document[]) => {
            this.documents = documents;
            console.log('Loaded documents', this.documents);
          },
          error => {
            console.error('Error loading documents:', error);
          }
        );
      }




    openNew() {
        this.document = {};
        this.submitted = false;
        this.documentDialog = true;
    }

    showEditDialog(document: Document): void {
        this.displayEditDialog = true;
        this.selectedDocumentId = document.id; // Ajoutez cette ligne pour capturer l'ID du document

        this.selectedDocument = document;
        this.DocumentForm.patchValue({
            name: document.name,
            categorie: document.categorie,
            creationDate: document.dateexpiration,
            motcle:document.motcle,
            taille:document.taille,

        });
    }
    // onSelectionChange(event: any) {
    //     // Logique à exécuter lorsque la sélection change
    //     console.log('Selected Results:', this.selectedResults);
    //   }
    
    //   onGlobalFilter(table: any, event: Event) {
    //     this.searchText=this.selectedOption
    // //    this.searchDocumentsWithElasticsearch()
    //     table.filterGlobal((<HTMLInputElement>event.target).value, 'contains');
    //   }
    
      onGlobalFilter(table: any, event: Event) {
      //  this.searchText=this.selectedOption
     //   this.searchDocumentsWithElasticsearch()
        table.filterGlobal(this.selectedOption, 'contains');
      }
    


    saveDocument(): void {
     
        if (this.DocumentForm.valid && this.selectedDocumentId) { // assurez-vous que selectedDocumentId n'est pas null
            const updatedDocument = {
                ...this.DocumentForm.value,
                id: this.selectedDocumentId // incluez l'ID ici
            };
            this.documentService.updateDocument(updatedDocument).subscribe({
            next: () => {
              this.displayEditDialog = false;
              this.loadDocuments(); // Refresh the list of departments
            },
            error: (error) => {
              console.error('Error updating category', error);
            }
          });
        } else {
            console.error('Form is not valid or ID is not set');
        }
      }


      viewDocumentDetails(document: Document) {
        this.selectedDocument = document;
        this.documentService.downloadDocumentPreview(document.id).subscribe(blob => {
            const unsafeUrl = window.URL.createObjectURL(blob);
            this.previewDocumentUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
            this.viewDocumentDialog = true; // Ouvrez la boîte de dialogue ici
        }, error => {
            console.error('Erreur lors de la récupération du document:', error);
        });
    }

    downloadDocument(selectedDocument: Document): void {
        if (!selectedDocument || !selectedDocument.id) {
            console.error('Aucun document sélectionné ou ID non défini');
            return;
        }
        this.documentService.downloadDocument(selectedDocument.id).subscribe(
            blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = selectedDocument.name || 'download'; // Fournir un nom par défaut si nécessaire
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove(); // Nettoyer le DOM
            },
            error => {
                console.error('Il y a eu un problème lors du téléchargement du document:', error);
            }
        );
    }





    openImportDialog() {
        this.importDocumentDialog = true;
    }

// Modifie la fonction onFileSelect pour ajouter les détails du fichier sélectionné
onFileSelect(event: any): void {
    if (event.files && event.files[0]) {
      const file = event.files[0];
      
    //     name: file.name,
    //     size: file.size,
    //     creationDate: null, 
    //     categorie: null // Ajoutez la logique pour récupérer la catégorie sélectionnée
    //   };
    const blob = new Blob([file], { type: file.type });
      this.newDocumentForm.patchValue({
        file: blob, 
       // file: fileData, 
        name: file.name, // Met à jour le champ du nom du fichier dans le formulaire
        creationDate: null,//new Date(),
        taille:file.size // Met à jour le champ de la date de création dans le formulaire
      });
      this.newDocumentForm.get('file').updateValueAndValidity();
      console.log('Fichier sélectionné :', file.name);
    }
  }
  

;
    
      
      

    saveImportedDocument(): void {
      console.log(this.newDocumentForm.getRawValue())
        if (this.newDocumentForm.valid) {
            const formData = new FormData();
        const file: Blob = this.newDocumentForm.get('file').value;
        if (file instanceof Blob) {
            formData.append('file', file);
            formData.append('name', this.newDocumentForm.get('name').value);
            formData.append('categorie', this.newDocumentForm.get('categorie').value);
            formData.append('creationDate', this.newDocumentForm.get('creationDate').value);
            formData.append('taille', this.newDocumentForm.get('taille').value.toString());
            formData.append('motcle', this.newDocumentForm.get('motcle').value);
            formData.append('user_id', this.newDocumentForm.get('user_id').value);
            console.log(this.newDocumentForm.getRawValue())
            this.documentService.addDocument(formData).subscribe({
                
                next: (doc) => {
                    // Ici, vous pouvez mettre à jour l'affichage de votre liste de documents si nécessaire
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Document ajouté',
                        detail: 'Le document a été ajouté avec succès!'
                    });
                    this.importDocumentDialog = false; // Fermer le dialogue d'importation
                    this.loadDocuments(); // Recharger la liste des documents
                    this.newDocumentForm.reset(); // Réinitialiser le formulaire après l'ajout
                },
                error: (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: `Une erreur est survenue lors de l'ajout du document: ${error.message}`
                    });
                    console.error('Une erreur est survenue:', error);
                }
            });
        } }else {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'Veuillez remplir tous les champs requis.'
            });
        }
    }


    // onSearchInputChange(event: any) {
    //     const inputText = event.target.value.trim();
    //     if (inputText !== '') {
    //       const query = {
    //         query: {
    //           match: {
    //             // Adjust the field based on your Elasticsearch index structure
    //             name: inputText
    //           }
    //         }
    //       };
    
    //       this.Client.search({
    //         index: 'your_index', // Replace with your Elasticsearch index name
    //         body: query
    //       }).then(response => {
    //         console.log('Elasticsearch search results:', response.hits.hits);
    //         // Process and display search results as needed
    //       }).catch(error => {
    //         console.error('Error searching in Elasticsearch:', error);
    //       });
    //     } else {
    //       // Clear search results if input is empty
    //       this.searchResults = [];
    //     }
    //   }



        handleError(error: any) {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue' });
          console.error('Une erreur est survenue:', error);
        }



        deleteDocument(document: Document) {
            this.documentService.deleteDocument(document).subscribe(
                response => {
                    this.documents = this.documents.filter(doc => doc.id !== document.id);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document deleted successfully!' });
                },
                error => {
                    this.handleError(error);
                }
            );
      }



    validateDocument(document: any): boolean {
        // Validate the document here
        return true; // or `false` if validation fails
    }


}
