import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { v4 as uuid } from 'uuid';

export interface AlertItem {
  id?: string;
  text: string;
  class: string;
  timeout: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alerts: AlertItem[];

  constructor() {
    this.alerts = [];
  }

  pushAlert(item: AlertItem){
    const elId = uuid();
    const newElement = {
      id: elId,
      ...item
    };
    this.alerts.push(newElement);
    console.log('Added', newElement );
    setTimeout( () => {
      this.removeAlert(elId);
    }, item.timeout);
  }

  private removeAlert(id: string){
    const index = this.alerts.findIndex(el => el.id === id);
    this.alerts.splice(index, 1);
  }

  public getArray(){
    return this.alerts;
  }
}
