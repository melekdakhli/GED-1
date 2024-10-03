

import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Document } from '../api/document';


@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<{ documents: Document[] }>(`${this.baseUrl}/showFournisseur`).pipe(
      map(response => response.documents) // Utilisez map pour extraire la propriété documents
    );
  }


  addDocument(documentData: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.baseUrl}/storeFournisseur`, documentData);
}



  deleteDocument(document: Document): Observable<Document> {
    return this.http.delete<Document>(`${this.baseUrl}/destroyFournisseur/${document.id}`);
  }




  updateDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.baseUrl}/updateFournisseur/${document.id}`, document);
}


downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadFournisseur/${documentId}`, {
        responseType: 'blob' // Très important pour indiquer que la réponse sera un Blob
    });
}

downloadDocumentPreview(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/previewFournisseur/${documentId}`, {
        responseType: 'blob' // Important pour recevoir un fichier
    });
}



}
