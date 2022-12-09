import { Category } from './../../shared/interfaces';
import { MaterialService } from './../../shared/classes/material.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef | undefined; // with this decorator we can access come elements fof our comp
  isNew = true;
  image: File | undefined;
  imagePreview: string | ArrayBuffer | null | undefined;
  form!: FormGroup;
  category!: Category;

  constructor(private route: ActivatedRoute, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.form = new FormGroup({ name: new FormControl(null, Validators.required) });

    // this.form.disable();

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
            this.category = category;
            console.log(category);
            
            this.form.patchValue({
              name: category.name,
            })
            this.imagePreview = category.imageSrc; // show preview if we have category
            MaterialService.updateTextInputs(); // text inputs will show value correct if they have
            this.form.enable();
          }
      }, error => MaterialService.toast(error.error.message))
    }
  triggerClick() {
    this.inputRef?.nativeElement.click(); // with this action I can trigger hidden input
  }

  onFileUpload(event: any) {
    console.log(event);
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }

  onSubmit() {
    let obs$;
    this.form.disable();

  
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id!, this.form.value.name, this.image);
    }
    
    this.form.enable();
    obs$.subscribe(
      category => {
        this.category = category;
        MaterialService.toast('changes saved');
        this.form.enable();
      },
      error => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      }
    )

  }

}
