import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-register-next',
  templateUrl: './user-register-next.component.html',
  styleUrls: ['./user-register-next.component.scss']
})
export class UserRegisterNextComponent implements OnInit {
  mailadress = 'unknown';
  constructor() { }

  ngOnInit(): void {
  }

}
