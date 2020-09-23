import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BackgroundComponent } from './components/background/background.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { UserRegisterConfirmComponent } from './components/user-register-confirm/user-register-confirm.component';
import { UserRegisterNextComponent } from './components/user-register-next/user-register-next.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';


const routes: Routes = [{
    path: 'auth',
    component: BackgroundComponent,
    children: [
      { path: 'login', component: UserLoginComponent },
      { path: 'register', component: UserRegisterComponent },
      { path: 'register/next', component: UserRegisterNextComponent },
      { path: 'register/confirm', component: UserRegisterConfirmComponent },
      { path: 'logout', component: UserLogoutComponent },
      { path: '', component: UserWelcomeComponent },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
