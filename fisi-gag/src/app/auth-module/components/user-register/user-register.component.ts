import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/custom-validators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required]),
      password1: new FormControl('', Validators.compose([
        Validators.required,
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        Validators.minLength(8)
      ])),
      password2: new FormControl('', [Validators.required])
    }, CustomValidators.passwordMatchValidator);
  }
  registerForm: FormGroup;
  public error = '';
  public submitted = false;


  ngOnInit(): void {

  }

  register(){
    this.submitted = true;
    if (!this.registerForm.valid){return; }
    this.authService.registerUser(this.registerForm.value.username, this.registerForm.value.mail, this.registerForm.value.password1)
      .then(res => {
        this.router.navigate(['/auth/register/next', { t: res['uid']}]);
      }).catch(err => {
        this.error = err;
        if (err === 'Nickname already taken'){
          this.changeName();
        }
        if (err === 'Email already taken'){
          this.changeMail();
        }
      });
  }

  changeName(){
    this.authService.checkUserName(this.registerForm.value.username).catch(err => {
      this.registerForm.controls.username.setErrors({
        used: true
      });
    });
  }

  changeMail(){
    this.authService.checkMail(this.registerForm.value.mail).catch(err => {
      this.registerForm.controls.mail.setErrors({
        used: true
      });
    });
  }


}

