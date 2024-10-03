import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// export interface Department {

//   nom: string;
//   type: string;
//   user_id:string;
// }


export interface Department {
    id?: number; // Rendre l'ID optionnel avec '?'

  nom: string;
 
}


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<{departments: Department[], totalCount: number}> {
    return this.http.get<{departments: Department[], totalCount: number}>(`${this.apiUrl}/showDP`);
  }


  deleteDepartment(department: Department): Observable<Department> {
    return this.http.delete<Department>(`${this.apiUrl}/destroyDP/${department.id}`);
}


  updateDepartment(department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/updateDP/${department.id}`, department);
  }




  // Add createDepartment method if needed
  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(`${this.apiUrl}/storeDP`, department);
  }
}
