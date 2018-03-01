import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SoftSetPage } from './soft-set';

@NgModule({
  declarations: [
    SoftSetPage,
  ],
  imports: [
    IonicPageModule.forChild(SoftSetPage),
  ],
})
export class SoftSetPageModule {}
