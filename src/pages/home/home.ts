import { Storage } from '@ionic/storage';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Loading, LoadingController  } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  user = {
    username: '',
    password: ''
  };
  loader: Loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthProvider,
    private toast: ToastController,
    private loading: LoadingController,
    private storage: Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter() {
    console.log('fadf');
    console.log(this.auth.isAuthenticated());
    // if(this.auth.isAuthenticated()) {
    //     this.navCtrl.setRoot('DashboardPage');
    // }

  }

  presentLoadingDefault() {
    this.loader = this.loading.create({
      content: 'Please Wait, while we log you in ...'
    });
    this.loader.present();
  }

  async login() {
    let name = 'sss';
    this.presentLoadingDefault();
    const result = await this.auth.login(this.user.username, this.user.password);
    await this.storage.get('accuser').then((val) => {
      name = val.name;
      console.log(name);
    });
    if(result) {
      this.toast.create({
        message: `Welcome ${name}.`,
        duration: 3000
      }).present();
      this.navCtrl.setRoot('DashboardPage');
    } else {
      this.toast.create({
        message: 'Invalid Credentials, or Session Expired. Please try again.',
        duration: 3000
      }).present();
    }
    this.loader.dismiss();
  }

}
