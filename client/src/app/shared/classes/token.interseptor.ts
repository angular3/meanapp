import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';

@Injectable()
export class TokenInterseptor implements HttpInterceptor { 
    // this class implements logic of adding token for every request to our server       
    constructor(private auth: AuthService, private router: Router) {

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            req = req.clone({
                setHeaders: {
                    Authorization: this.auth.getToken()
                }
            })
        }
        // we return modified or original request
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => this.handleAuthError(error)))
    };
        

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.router.navigate(['/login'], {
                queryParams: {
                    sessionExpired: true,
                }
            })
        }
        return throwError(() => new Error(error.message))
    }
}
    
   