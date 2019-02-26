import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Mes imports de module
import {BodyComponent} from './body/body.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {UserpageComponent} from './userpage/userpage.component';
import {AnnuaireComponent} from './annuaire/annuaire.component';

const routes: Routes = [
  {path: '', component: BodyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'userpage', component: UserpageComponent},
  {path: 'annuaire', component: AnnuaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
