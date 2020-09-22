import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import ParticlesConfig from '../../../../../../assets/data/particles.json';
declare var particlesJS: any;

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

  private slogans: string[] = [
    'It\'s like Facebook, but entierly different!',
    'What happens at 9¾-GAG stays at 9¾-GAG!',
    '69% of people find something dirty in every sentence...',
    'People say nothing is impossible, But I do nothing everyday',
    'My imaginary friend thinks you have some serious problems',
    'Life is short, smile while you still have teeth',
    'Don’t Drink and Drive, You might hit a bump and spill something'
  ];

  public sloganCurrent = 'Something is wrong. I can feel it ... :/';
  public error = '';
  public submitted = false;

  ngOnInit(): void {
    this.sloganCurrent = this.slogans[Math.round(Math.random() * (this.slogans.length - 1))];
    particlesJS('particles-js', ParticlesConfig, () => {
      console.log('callback - particles.js config loaded');
    });
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
