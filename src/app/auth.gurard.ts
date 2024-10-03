import {ActivatedRouteSnapshot, CanActivate,CanActivateChildFn,Router, RouterStateSnapshot, UrlTree} from  '@angular/router';
import  {Injectable }from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate {


    constructor( private router: Router) {}

    // Ici, vous pouvez ajouter une logique supplémentaire pour vérifier la validité du token

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (localStorage.getItem('token')) {
        return true;
      } else {
        // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        this.router.navigate(['/auth/login']);
        return false;
      }
    }

  }
