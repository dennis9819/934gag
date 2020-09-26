import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


export interface MyUserAccount {
  userId: string;
  userAccount: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  me: MyUserAccount;
  private isLoggedIn = false;
  dummyUsers: any[] = [
    {
      userId: '1',
      userAccount: 'dennis9819',
      userPassword: 'test123',
      userMail: 'mail@dennisgunia.de',
    }
  ];
  constructor(
    private api: ApiService
  ) { }

  login(username: string, password: string){
    return new Promise<void>((resolve, reject) => {
      const user = this.dummyUsers.filter(el => el.userAccount === username);
      if (user.length === 0){ reject('User not found'); }
      if (user[0].userPassword !== password){ reject('Pasword incorrect'); }
      this.me = user[0];
      this.isLoggedIn = true;
      resolve();
    });
  }

  logout(){
    return new Promise<void>((resolve, reject) => {

    });
  }

  getUserName(){
    return this.me;
  }

  loggedIn(){
    return this.isLoggedIn;
  }

  checkUserName(username: string){
    return new Promise<void>((resolve, reject) => {
      this.api.apiPost('/auth/user/testName', {user: username}).then( data => {
        // tslint:disable-next-line: no-string-literal
        if (data['data'].used){
          reject('username used');
        }else{
          resolve();
        }
      });
    });
  }

  checkMail(mailin: string){
    return new Promise<void>((resolve, reject) => {
      this.api.apiPost('/auth/user/testMail', {mail: mailin}).then( data => {
        // tslint:disable-next-line: no-string-literal
        if (data['data'].used){
          reject('Mailadress used');
        }else{
          resolve();
        }
      });
    });
  }

  registerUser(username: string, mail: string, password: string){
    return new Promise<void>((resolve, reject) => {
      this.api.apiPost('/auth/user/register', {
        nick: username,
        mail,
        passwd: password,
        name_first: '',
        name_last: ''
      }).then((res) => {
        // tslint:disable-next-line: no-string-literal
        resolve(res['data']);
      }).catch((err) => {
        console.error(err);
        reject();
      });
    });
  }

  resendVerificationMail(t: string){
    return new Promise<void>((resolve, reject) => {
      this.api.apiPost('/auth/user/resendToken', {t}).then((res) => {
        // tslint:disable-next-line: no-string-literal
        resolve();
      }).catch((err) => {
        console.error(err);
        reject();
      });
    });
  }
}
