import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  endpoint = 'http://localhost:3000';
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private http: HttpClient) {
  }
  ionViewCanEnter() {
    if(!this.auth.isAuthenticated()) {
      this.navCtrl.setRoot('HomePge');
    }
  }
  ionViewDidLoad() {
    this.http.get(`${this.endpoint}/users`).subscribe( res => console.log(res));
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('HomePage');
  }

}
