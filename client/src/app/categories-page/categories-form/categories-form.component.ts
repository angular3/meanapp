import { MaterialService } from './../../shared/classes/material.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  isNew = true;
  form!: FormGroup;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({ name: new FormControl(null, Validators.required) });

    this.form.disable();

    // this.route.params.subscribe((params: Params) => {
    //   if (params['id'].) {// if we have id - we're update form data
    //     this.isNew = false;

    //   } // esle we're creating new one !!!! This is old style

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['id']) {
            this.isNew = false;
            return this.categoriesService.getById(params['id']);
          }
            return of(null) // here we create Observable from null with 'of' method
        })
      ).subscribe(
        category => {
          if (category) {
            this.form.patchValue({
              name: category.name,
            })
            MaterialService.updateTextInputs(); // text inputs will show value correct if they have
            this.form.enable();
          }
      }, error => MaterialService.toast(error.error.message))
    }
  

  onSubmit() {

  }

}
