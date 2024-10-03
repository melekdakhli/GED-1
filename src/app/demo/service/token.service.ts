import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  encodedToken:any ;
  token:any;
  constructor() {
    }
gettoken(){
  this.encodedToken = localStorage.getItem('token');
  // Decode the token
   this.token = atob(this.encodedToken);
  return jwtDecode( this.token);
}
}