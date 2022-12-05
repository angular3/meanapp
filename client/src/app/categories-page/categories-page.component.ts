import { CategoriesService } from './../shared/services/categories.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  loading = false;
  categories: any = [];

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.loading = true;
    this.categoriesService.fetch().subscribe(cat => {
      this.loading = false;
      this.categories = cat;
      console.log('cat', cat)
    })
  }

}
