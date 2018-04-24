import { Roles } from './../../model/roles.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
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
  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello AuthProvider Provider');
  }

  async isAuthenticated(): Promise<boolean> {
    let token = '';
    token = await this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  async getToken(){
    return this.storage.get('token');
  }


  async login(username: string, password: string): Promise<boolean> {
    const result = await this.http.post(`${this.endpoint}/auth/login`, { username, password }).toPromise();
    if(!result['error']) {
      const token = result['token'];
      this.storage.set('token', token);
      this.storage.set('accuser', this.jwtHelper.decodeToken(token)['user']);
      return true;
    } else {
      console.log(result['error']);
      return false;
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
}
