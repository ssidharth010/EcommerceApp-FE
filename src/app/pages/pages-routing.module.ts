import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ContactComponent } from './account/contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  // { 
  //   path: 'login', 
  //   component: LoginComponent 
  // },
  // { 
  //   path: 'register', 
  //   component: RegisterComponent 
  // },
  // { 
  //   path: 'forget/password', 
  //   component: ForgetPasswordComponent 
  // },
  // { 
  //   path: 'profile', 
  //   component: ProfileComponent 
  // },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: 'aboutus', 
    component: AboutUsComponent 
  },
  // { 
  //   path: 'search', 
  //   component: SearchComponent 
  // },
  // { 
  //   path: 'faq', 
  //   component: FaqComponent 
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
