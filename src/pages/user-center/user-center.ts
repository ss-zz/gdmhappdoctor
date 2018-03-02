import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/biz/user-service';
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
  isLogin: Boolean = false;

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
    // 用户是否登录
    this.userService.isLogin().then(isLogin => {
      this.isLogin = isLogin;
      if (isLogin) {
        // 登录用户信息
        this.userService.getLoginInfo().then(userInfo => {
          this.user = userInfo;
        });
      }
    });
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
