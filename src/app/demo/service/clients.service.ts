
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Document } from '../api/document';


@Injectable({
  providedIn: 'root'
})
export class clientsService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDocuments(): Observable<Document[]> {
    return this.http.get<{ documents: Document[] }>(`${this.baseUrl}/showClient`).pipe(
      map(response => response.documents) // Utilisez map pour extraire la propriété documents
    );
  }


  addDocument(documentData: FormData): Observable<Document> {
    return this.http.post<Document>(`${this.baseUrl}/storeClient`, documentData);
}



  deleteDocument(document: Document): Observable<Document> {
    return this.http.delete<Document>(`${this.baseUrl}/destroyClient/${document.id}`);
  }




  updateDocument(document: Document): Observable<Document> {
    return this.http.put<Document>(`${this.baseUrl}/updateClient/${document.id}`, document);
}


downloadDocument(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/downloadClient/${documentId}`, {
        responseType: 'blob' // Très important pour indiquer que la réponse sera un Blob
    });
}

downloadDocumentPreview(documentId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/previewClient/${documentId}`, {
        responseType: 'blob' // Important pour recevoir un fichier
    });
}



}
