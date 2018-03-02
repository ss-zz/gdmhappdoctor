import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 离线数据-详情
 */

@IonicPage()
@Component({
  selector: 'page-data-offline-detail',
  templateUrl: 'data-offline-detail.html',
})
export class DataOfflineDetailPage {

  // 数据对象
  item = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    console.dir(this.item);
  }

}
