import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // navigation between pages
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

const routes: Routes = [ // we created two layouts(common comps) and they will be stored on different routes,
// so here we need to register them and then we can pass childrens components in array( all routes of this layout)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [

    ]
  }
];

@NgModule({//decorator of our module - importing from ang core/  this module define all routing in our app
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
