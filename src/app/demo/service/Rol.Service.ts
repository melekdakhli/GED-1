



// Rol.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Role {
    id?: number; // Rendre l'ID optionnel avec '?'

    nom: string;
    type: string;
    user_id:string;
  }


@Injectable({
  providedIn: 'root'
})
export class RoleService {
    private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getRoles(): Observable<{roles: Role[], totalCount: number}> {
    return this.http.get<{roles: Role[], totalCount: number}>(`${this.apiUrl}/showR`);
  }



  // Méthode pour créer un nouveau rôle
   createRole(role: Role): Observable<Role> {
        return this.http.post<Role>(`${this.apiUrl}/storeR`, role);
    }


  // Méthode pour mettre à jour un rôle existant
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.apiUrl}/updateR/${role.id}`, role);
}


  // Méthode pour supprimer un rôle

  deleteRole(role: Role): Observable<Role> {
    return this.http.delete<Role>(`${this.apiUrl}/destroyR/${role.id}`);
}


}



  // Méthode pour récupérer des rôles avec pagination

//   public getRoles(page: number, pageSize: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
//   }

// getRoles(): Observable<any> {
//     return this.http.get(`http://127.0.0.1:8000/api/showR`);
//   }
// getRoles(page: number, pageSize: number): Observable<any> {
//     // Assurez-vous que l'URL est correcte et que la pagination est gérée correctement par le backend.
//     return this.http.get<any>(`${this.apiUrl}/showR?page=${page}&pageSize=${pageSize}`);
// }
