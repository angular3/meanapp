import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/index';
import { Category } from '../interfaces';


@Injectable({
    providedIn: 'root',
})

export class CategoriesService {
    constructor(private http: HttpClient) {
    }

    fetch(): Observable<Category[]> { // get all categories
        return this.http.get<Category[]>('/api/category');
    }
}