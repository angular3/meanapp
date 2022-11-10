import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

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
    
    this.route.queryParams.subscribe((parpms: Params) => {
      if (parpms['registeres']) {
        // now you can log in
      }
      if (parpms['accessDenied']) {
        // you should autorizw
      }
    })
  }

  ngOnDestroy(): void {
   this.aSub && this.aSub.unsubscribe()
  }

  onSubmit() {
    this.form.disable();

    this.auth.login(this.form.value).subscribe( // here we have subscribe and we can have memory leak
      () => this.router.navigate(['/overview']),
      error => {
        console.warn(error)

        this.form.enable()
      },
    );
  }
  
  

}
