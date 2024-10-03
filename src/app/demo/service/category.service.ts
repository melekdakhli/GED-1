import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Categorie {
    id?: number; // Rendre l'ID optionnel avec '?'

    nom: string;
    description?: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/showC`);
  }

  

  deleteCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.delete<Categorie>(`${this.apiUrl}/destroyC/${categorie.id}`);
}

  public updateCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.put<Categorie>(`${this.apiUrl}/updateC/${categorie.id}`, categorie);
  }

  public createCategorie(categorie: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(`${this.apiUrl}/storeC`, categorie);
  }
}
