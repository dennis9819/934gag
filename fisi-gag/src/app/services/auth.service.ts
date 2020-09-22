import { Injectable } from '@angular/core';


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
      userPassword: 'test123'
    }
  ];
  constructor() { }

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
}
