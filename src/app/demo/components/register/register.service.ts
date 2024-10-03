import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Remplace Http

@Injectable()
export class RegisterService {

  constructor(private http: HttpClient) { // Remplace Http
  }

  authenticate(email, password) {
    // Utilisez this.http pour effectuer vos appels HTTP
  }
}
