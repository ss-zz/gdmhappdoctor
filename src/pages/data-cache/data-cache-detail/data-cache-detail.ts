import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 缓存数据-详情
 */

@IonicPage()
@Component({
  selector: 'page-data-cache-detail',
  templateUrl: 'data-cache-detail.html',
})
export class DataCacheDetailPage {

  // 数据对象
  item = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    console.dir(this.item);
  }


}
