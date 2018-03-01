import { NgModule, } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoViewPage } from './user-info-view';

@NgModule({
  declarations: [UserInfoViewPage],
  imports: [IonicPageModule.forChild(UserInfoViewPage)]
})
export class UserInfoViewModule { }
