import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accesstoken = '';
  refresh =false;

  constructor(
    private http : HttpClient
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
const req =request.clone({
  setHeaders :{
  // authorzation :`Bearer ${AuthInterceptor.accesstoken}`

  }
});


    return next.handle(req).pipe(catchError((err: HttpErrorResponse) =>{
        if(err.status === 401 && !this.refresh){
            this.refresh = true; //bch manti7ch f boucle infie fel refresh =>
            return this.http.post('http://localhost:8000/api/refreshToken',{withCredentials : true}).pipe(
                switchMap((res: any)=>{
                    AuthInterceptor.accesstoken=res.token;

                    return next.handle(request.clone({
                        setHeaders :{
                          Authorization:`Bearer ${AuthInterceptor.accesstoken}`
                          /* authorzation :'Bearer'+localStorage.getItem('token') */
                        }
                      }));
                })
            );
        }

        this.refresh =false;
        return throwError(()=>err);
    }));
  }
}
