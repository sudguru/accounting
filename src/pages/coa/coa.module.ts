import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoaPage } from './coa';

@NgModule({
  declarations: [
    CoaPage,
  ],
  imports: [
    IonicPageModule.forChild(CoaPage),
  ],
})
export class CoaPageModule {}
