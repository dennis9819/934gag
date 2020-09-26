import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  apiPost(rescource: string, data: {}){
    return new Promise((resolve, reject) => {
      this.http.post(`/api/${rescource}`, JSON.stringify(data),{
        headers: this.header
      }).subscribe((retData: any) => {
        resolve(retData as any);
      }, (errData) => {
        console.log(errData);
        reject(errData);
      });
    });
  }
}
