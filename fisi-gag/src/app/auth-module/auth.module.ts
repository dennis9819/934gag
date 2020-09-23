import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserWelcomeComponent } from './components/user-welcome/user-welcome.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRegisterConfirmComponent } from './components/user-register-confirm/user-register-confirm.component';



@NgModule({
  declarations: [
    UserLoginComponent,
    UserLogoutComponent,
    UserWelcomeComponent,
    UserRegisterComponent,
    UserRegisterConfirmComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule

  ]
})
export class AuthModule { }
