import { Component } from '@angular/core';
import { NavController, ModalController, IonicPage, ViewController } from 'ionic-angular';

import { NativeService } from "../../../providers/NativeService";
import { TabsPage } from "../../tabs/tabs";
import { FindPasswordPage } from '../find-password/find-password';
import { UserServiceProvider } from '../../../providers/biz/user-service';
import { GlobalData } from "../../../providers/GlobalData";
import { Storage } from '@ionic/storage';
/**
 * 登录
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  // 是否能返回
  isCanBack: Boolean = false;
  // 登录参数
  params = { userName: '', passWord: '' };
  // 登录表单
  loginForm: any;
  username: any;
  password: any;

  constructor(
    private nativeService: NativeService,
    public navCtrl: NavController,
    private userService: UserServiceProvider,
    private modalCtrl: ModalController,
    public storage: Storage,
    public viewCtrl: ViewController,
    private globalData: GlobalData,
  ) { }

  // 每次页面进入
  ionViewWillEnter() {
    this.isCanBack = this.navCtrl.canGoBack();
  }

  /**
   * 登录
   */
  login() {
    this.userService.login(this.params).then(data => {
      console.log(data);
      if (data) {
        this.nativeService.showToast("登录成功");
        let user: any = data;
        this.storage.set("token", user.token);
        this.globalData.token = user.token;
        this.closeLogin();
      }
    })
  }

  /**
   * 取消登录
   */
  closeLogin() {
    this.viewCtrl.dismiss();
  }

  /**
   * 打开窗口-找回密码
   */
  openModalFindPassword() {
    this.modalCtrl.create(FindPasswordPage).present();
  }

  /**
   * 取消登录
   */
  cancleLogin() {
    if (this.isCanBack) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.setRoot(TabsPage);
    }
  }

}
