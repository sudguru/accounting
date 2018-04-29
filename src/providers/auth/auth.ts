import { User } from './../../model/user.interface';
import { Observable } from 'rxjs/Observable';
import { Roles } from './../../model/roles.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { JwtHelper } from 'angular2-jwt';


export interface Result {
  staus: string;
  error: string;
  response: string;
  token?: string;
}

@Injectable()
export class AuthProvider {
  endpoint = 'http://localhost:3000';
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(public http: HttpClient) {
    
  }

  authState(): Observable<User> {
    let user = null;
    const token = localStorage.getItem('token');
    if(token && !this.jwtHelper.isTokenExpired(token)) {
      user = this.jwtHelper.decodeToken(token)['user'];
      return Observable.of(user);
    } else {
      return Observable.of(null);
    }
    
  }



  async login(username: string, password: string): Promise<any> {
    const result = await this.http.post(`${this.endpoint}/auth/login`, { username, password }).toPromise();
    if(!result['error']) {
      const token = result['token'];
      localStorage.setItem('token', token);
      const user = this.jwtHelper.decodeToken(token)['user'];
      return user;
    } else {
      console.log(result['error']);
      return null;
    }
  }

  async register(username: string, password: string, name: string): Promise<boolean> {
    const roles: Roles = {
      register: false,
      addReceipt: true,
      addPurchase: true,
      addInvoice: true,
      addPurchaseReturns: true,
      addSalesReturns: false,
      addJV: true,
      cancel: false,
      basicReports: true,
      advancedReports: false
    }
    const rolesString = JSON.stringify(roles);
    const result = await this.http.post(`${this.endpoint}/auth/register`, { username, password, name, roles: rolesString }).toPromise();
    if(!result['error']) {
      console.log(result['response']);
      return true;
    } else {
      console.log(result['error']);
      return false;
    }
    
  }

  logout() {
      localStorage.removeItem('token');
  }
}
