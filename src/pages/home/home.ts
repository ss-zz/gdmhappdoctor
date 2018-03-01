import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

/*
  首页页面
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * 构造函数
   */
  constructor(public navCtrl: NavController) {

  }

  /**
   * 页面加载完成，创建时触发一次，页面缓存之后再次进入不会触发
   */
  ionViewDidLoad() {

  }

  /** 页面将要进入 */
  ionViewWillEnter() {

  }

  /** 页面进入 */
  ionViewDidEnter() {

  }

  /** 页面将要离开 */
  ionViewWillLeave() {

  }

  /** 页面离开 */
  ionViewDidLeave() {

  }

  /** 页面将要销毁 */
  ionViewWillUnload() {

  }

}
