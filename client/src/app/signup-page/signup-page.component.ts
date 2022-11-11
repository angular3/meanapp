import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
  form!: FormGroup
  aSub!: Subscription // memory leaks handling

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnDestroy(): void {
   this.aSub && this.aSub.unsubscribe() // protection of memory leaks
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.auth.register(this.form.value).subscribe( // here we have subscribe and we can have memory leak
      () => {
        this.router.navigate(['/login'], {
          queryParams: { // we pass here query params and then on login page we can handle them and do smt(show message)
            registered: true,
          }
        })
      },
      error => {
        console.warn(error)

        this.form.enable()
      },
    );
  }
  
  

}
