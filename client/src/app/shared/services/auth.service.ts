import { Injectable } from "@angular/core";
import { User } from "../interfaces";
import {HttpClient} from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root', // this field means that angular will register this module automatically in root module
})
export class AuthService {
    private token = '';

    constructor(private http: HttpClient ) {

    }

    register() {
        
    }

    login(user : User): Observable<{token: string}> { // we're waiting object with token, it is string so we use Observable
        return this.http.post<{ token: string }>('/api/auth/login', user)
            .pipe(
                tap(({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.setToken(token)
                })
            )
    }

    setToken(token: string) {
        this.token = token
    }
}