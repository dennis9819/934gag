import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertItem, AlertService } from 'src/app/gagcomponents/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register-next',
  templateUrl: './user-register-next.component.html',
  styleUrls: ['./user-register-next.component.scss']
})
export class UserRegisterNextComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertService: AlertService,
  ) { }
  private t = '';
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.t = params['t'];
    });
  }

  resend(): void {
    console.log("resends", this.t)
    if (this.t){
      this.authService.resendVerificationMail(this.t).then(() => {
        this.alertService.pushAlert({
          text: 'A new token has been sent to your mail adress',
          class: 'green',
          timeout: 3000
        });
      }).catch((err) => {
        this.invalidNotify();
      });
    }else{this.invalidNotify(); }
  }

  invalidNotify() {
    // TODO: notify t invalid
    this.alertService.pushAlert({
      text: 'No token can be requested for this user',
      class: 'red',
      timeout: 3000
    });
  }
}
