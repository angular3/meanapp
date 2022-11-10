import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    SignupPageComponent
  ],
  imports: [// register another modules
    BrowserModule, 
    AppRoutingModule,
    FormsModule,// adding ng model
    ReactiveFormsModule,// adding reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
