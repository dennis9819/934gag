import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private authService: AuthService
  ) { }

  public error = '';
  public submitted = false;

  ngOnInit(): void {
  }

  login(){
    this.submitted = true;
    if (!this.loginForm.valid){return; }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .then(res => {
        console.log('loggedIn');
      }).catch(err => {
        this.error = err;
        if (err === 'Pasword incorrect'){
          this.loginForm.controls.password.setErrors({
            incorrect: true
          });
        }
        if (err === 'User not found'){
          this.loginForm.controls.username.setErrors({
            incorrect: true
          });
        }
      });
  }

}
