import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
//import { User } from './user.model'; // Supposons que vous ayez un modèle User

export interface User {
    nom: string;
    user_id :number;
    // Ajoutez d'autres propriétés nécessaires
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private currentUser: User = {

        nom: 'User',
        user_id: 1,
         // Mettez ici une valeur par défaut ou récupérez-la depuis une source
        // Autres propriétés selon votre modèle User
    };

    constructor() {}

    getCurrentUser(): User {
        return this.currentUser;
    }
}


