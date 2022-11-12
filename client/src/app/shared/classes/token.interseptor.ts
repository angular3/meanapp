import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Injectable()
export class TokenInterseptor implements HttpInterceptor { // this class implements logic of adding token for every request to our server

    constructor(private auth: AuthService) {

    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
             req = req.clone({
                setHeaders: {
                    Aitorization: this.auth.getToken()
                }
            })
        }
        return next.handle(req)
    }
 
}