import { Observable } from 'rxjs/Observable';
import { User } from './../../model/user.interface';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ToastController, Loading, LoadingController  } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user: User;
  loader: Loading;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private auth: AuthProvider,
    private toast: ToastController,
    private loading: LoadingController
  ) {
    this.menuCtrl.enable(false, 'actualsidemenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter() {
    this.auth.authState().subscribe(user => {
      console.log(user);
      if(user) {
        this.navCtrl.setRoot('DashboardPage')
      } else {
        this.user = {
          username: '',
          password: '',
          name: '',
          roles: ''
        }
      }
    })
  }

  presentLoadingDefault() {
    this.loader = this.loading.create({
      content: 'Please Wait, while we log you in ...'
    });
    this.loader.present();
  }

  async login() {

    this.presentLoadingDefault();
    const result: User = await this.auth.login(this.user.username, this.user.password);
    if(result) {
      this.toast.create({
        message: `Welcome ${result.name}.`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot('DashboardPage');
    } else {
      this.toast.create({
        message: 'Invalid Credentials. Please try again.',
        duration: 3000
      }).present();
    }
    this.loader.dismiss();
  }

}
