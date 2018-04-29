import { User } from './../../model/user.interface';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import 'rxjs/add/operator/take';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  user: User;
  constructor(public navCtrl: NavController, public menuCtrl: MenuController, private auth: AuthProvider, private http: HttpClient) {
    this.menuCtrl.enable(true, 'actualsidemenu');
  }
  ionViewCanEnter() {
    this.auth.authState().subscribe(user => {
      if(!user) {
        this.navCtrl.setRoot('HomePage')
      } else {
        this.user = user;
        console.log(this.user);
      }
    })
  }
  ionViewDidLoad() {
    // this.http.get(`${this.endpoint}/users`).take(1).subscribe( res => console.log(res));
  }


}
