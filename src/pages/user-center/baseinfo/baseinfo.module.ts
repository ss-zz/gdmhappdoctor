import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaseinfoPage } from './baseinfo';

@NgModule({
  declarations: [
    BaseinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BaseinfoPage),
  ],
})
export class BaseinfoPageModule {}
