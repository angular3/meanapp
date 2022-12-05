import { CategoriesService } from './../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  
  categories$: Observable<Category[]> | undefined // $ means that it us stream and it's async

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()   //fetch returns Observable with all cats list and for request we need to use subscribe method
  }

}
