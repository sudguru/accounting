import { UserProvider } from './../../providers/user/user';
import { User } from './../../model/user.interface';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
export interface serverResponse {
  status: number;
  error: any;
  data: any;
}
@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  user: User;
  users: User[];
  userRoles = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private userData: UserProvider) {
  }

  ionViewCanEnter() {
    this.auth.authState().subscribe(user => {

        if(!user) {
          this.navCtrl.setRoot('HomePage')
        } else {
          this.user = user;
 
          this.userData.getAllUsers().subscribe(response => {
            const res = response as serverResponse;
            this.users = JSON.parse(res.data); 
            console.log(this.users);
        });
      }
    });
  
  }

}
