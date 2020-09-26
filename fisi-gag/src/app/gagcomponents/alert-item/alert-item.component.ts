import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AlertItem } from '../alert.service';

@Component({
  selector: 'app-alert-item',
  templateUrl: './alert-item.component.html',
  styleUrls: ['./alert-item.component.scss']
})
export class AlertItemComponent implements OnInit {

  constructor() {

   }

  @Input()
  data: AlertItem;

  ngOnInit(): void {
    console.log(this.data)
  }

}
