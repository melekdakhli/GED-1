// document.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from '../api/document'; // Assurez-vous que le chemin est correct

@Injectable()
export class DocumentService {

    constructor(private http: HttpClient) { }


    // getDocuments() {
    //     // Remplacez 'assets/demo/data/documents.json' par l'URL de votre API
    //     return this.http.get<Document[]>('http://localhost:3000/documents') // Assurez-vous d'utiliser la bonne URL
    //         .toPromise()
    //         .then(data => data);
    // }

    getDocuments() {
        return this.http.get<any>('assets/demo/data/documents.json') // Assurez-vous d'avoir le bon chemin
            .toPromise()
            .then(res => res.data as Document[])
            .then(data => data);
    }

    // Ajoutez d'autres méthodes pour la gestion des documents selon vos besoins
}







// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Document } from '../api/document'; // Assurez-vous que le chemin d'accès est correct

// @Injectable()
// export class DocumentService {

//     constructor(private http: HttpClient) { }

//    getDocuments() {
//         // Utilisez l'URL appropriée pour récupérer vos documents depuis votre backend
//         return this.http.get<any>('assets/demo/data/products.json')
//             .toPromise()
//             .then(res => res.data as Document[])
//             .then(data => data);
//     }





//     saveDocument(document: Document) {
//         // Envoyez le document au backend pour sauvegarde
//         return this.http.post<any>('api/documents', document)
//             .toPromise()
//             .then(res => res.data as Document);
//     }

//     updateDocument(document: Document) {
//         // Envoyez le document mis à jour au backend pour mise à jour
//         return this.http.put<any>(`api/documents/${document.id}`, document)
//             .toPromise()
//             .then(res => res.data as Document);
//     }

//     deleteDocument(id: string) {
//         // Envoyez l'ID du document à supprimer au backend
//         return this.http.delete<any>(`api/documents/${id}`)
//             .toPromise()
//             .then(res => res.data as Document);
//     }

// }






// saveDocument() {
//     if (this.newDocumentForm.valid) {
//         const newDoc: Document = {
//             ...this.newDocumentForm.value,
//             dateajout: new Date(),
//             datemodification: new Date(),
//             creerpar: 'Current User' // Replace with actual user ID or username from authentication service
//         };
//         console.log(newDoc);

//         if (this.document.id) {
//             this.documentService.updateDocument(newDoc).subscribe(
//                 response => {
//                     this.documents = this.documents.map(doc => doc.id === newDoc.id ? newDoc : doc);
//                     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document updated successfully!' });
//                     this.documentDialog = false;
//                 },
//                 error => {
//                     this.handleError(error);
//                 }
//             );
//         } else {
//             console.log(newDoc);

//             this.documentService.addDocument(newDoc).subscribe(
//                 response => {
//                     this.documents.push(response);
//                     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Document added successfully!' });
//                     this.documentDialog = false;
//                 },
//                 error => {
//                     this.handleError(error);
//                 }
//             );
//         }
//     }
// }
