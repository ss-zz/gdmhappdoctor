import { NgModule, } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { UserCenterPage } from './user-center';

/**
 * 用户中心/个人/我的模块
 */
@NgModule({
  declarations: [UserCenterPage],
  imports: [IonicPageModule.forChild(UserCenterPage)]
})
export class UserCenterModule { }
