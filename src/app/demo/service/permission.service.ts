import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission, RolePermissions } from './permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}


  public getPermissions(): Observable<RolePermissions[]> {
    return this.http.get<RolePermissions[]>(`${this.apiUrl}/showP`);
  }

  updatePermissions(permissionId: number, permissions: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateP/${permissionId}`, permissions);
  }

  addPermission(permissionData: any): Observable<Permission> {
    return this.http.post<Permission>(`${this.apiUrl}/storeP`, permissionData);
  }
  deletePermission(permissionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/destroyP/${permissionId}`);
  }

}
