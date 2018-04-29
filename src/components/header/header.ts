import { AuthProvider } from './../../providers/auth/auth';
import { Component, Input} from '@angular/core';
import { App } from 'ionic-angular';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() title: string;
  constructor(private auth: AuthProvider, private app: App) {

  }
  
  logout() {
    this.auth.logout();
    this.app.getRootNav().setRoot('HomePage');
  }

}
