import { Component, ViewChild } from '@angular/core';
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

  // 滚动插件
  @ViewChild('ionSlides') slides;
  // 数据-滚动图片
  itemsSlide: any;

  constructor(public navCtrl: NavController) {
    this.itemsSlide = [
      { path: 'assets/img/bg/banner2.png' },
      { path: 'assets/img/bg/banner2.png' },
      { path: 'assets/img/bg/banner2.png' },
      { path: 'assets/img/bg/banner2.png' },
      { path: 'assets/img/bg/banner2.png' }
    ];
  }

  /**
   * 页面加载完成
   */
  ionViewDidLoad() {
    
  }

  /**
   * 每次页面进入
   */
  ionViewDidEnter() {
    if (this.itemsSlide) {
      this.slides.startAutoplay();
      this.slides.autoplayDisableOnInteraction = false;
    }
  }

  /**
   * 页面离开
   */
  ionViewDidLeave() {
    // 停止滚动
    this.slides.stopAutoplay();
  }

}
