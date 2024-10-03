import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // URL de base de l'API

  constructor(private http: HttpClient) {}

  getUsersWithoutPermissions(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/getUsersWithoutPermissions`);
  }



getUsers(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/index1`);
  }

  addUser(newUser: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/register`, newUser);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, userData);
  }
  
  updateUser1(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update1/${id}`, userData);
  }


  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/destroy/${id}`);
  }
}



//   getUsers(): Observable<any> {
//     return this.http.get(`${this.baseUrl}/show`);
//   }
