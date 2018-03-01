import { Component, ViewChild} from '@angular/core';
import { Platform, Nav, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import { GlobalData} from "../providers/GlobalData";

/**
 * app 根组件
 */
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = TabsPage;// 根页面
  backButtonPressed: boolean = false;// 返回键是否已触发

  // 导航
  @ViewChild(Nav) nav: Nav;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private toast: ToastController,
    public storage: Storage,
    private globalData:GlobalData
  ) {
    let that = this;
    this.platform = platform;
    this.toast = toast;

    this.rootPage = TabsPage;
    // 获取token并放入全局变量
    this.storage.get('token').then(function (token) {
      that.globalData.token=token;
    })

    // 初始化
    this.init();
  }

  /**
   * 初始化
   */
  init() {
    // 启动完成
    this.platform.ready().then(() => {
      // 设置状态栏
      this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      // 隐藏启动页
      this.splashScreen.hide();
      // 注册返回按键事件
      this.platform.registerBackButtonAction((): any => {
        // 获取已激活页面
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        if (!(page instanceof TabsPage)) {
          if (!this.nav.canGoBack()) {
            // 当前页面为tabs，退出APP
            return this.showExit();
          }
          // 当前页面为tabs的子页面，正常返回
          return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          // 当前页面为tab栏，退出APP
          return this.showExit();
        }
        // 当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 101);

    });
  }

  // 双击退出提示框
  showExit() {
    if (this.backButtonPressed) {
      // 当触发标志为true时，双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      let toast = this.toast.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      // 2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 2000)
    }
  }

}
