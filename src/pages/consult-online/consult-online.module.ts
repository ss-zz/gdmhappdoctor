import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultOnlinePage } from './consult-online';

@NgModule({
  declarations: [
    ConsultOnlinePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultOnlinePage),
  ],
})
export class ConsultOnlinePageModule {}
