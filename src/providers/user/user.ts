import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  endpoint = 'http://localhost:3000';
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  getAllUsers() {
    return this.http.get(`${this.endpoint}/users`);
  }

}
