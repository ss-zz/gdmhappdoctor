import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/biz/user-service';
import { APP_SERVE_URL } from "../../providers/Constants";
import { ZBar, ZBarOptions } from '@ionic-native/zbar';

/**
 * 用户中心/个人
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
})
export class UserCenterPage {

  // 用户信息
  user: any = {};
  // 是否登录
  isLogin: Boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    private zbar: ZBar
  ) { }

  // 每次页面进入
  ionViewWillEnter() {
    this.refreshUserInfo();
  }

  // 刷新用户信息
  refreshUserInfo() {

  }

  // 退出登录
  logout() {
    this.userService.logout().then(() => {
      this.refreshUserInfo();
    });
  }

  // 扫一扫
  zbarScan() {
    let options: ZBarOptions = {
      flash: 'auto',
      drawSight: true
    };

    this.zbar.scan(options)
      .then(result => {

      })
      .catch(error => {

      });

  }

}
