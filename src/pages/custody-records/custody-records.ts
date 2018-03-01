import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 监护记录
 */

@IonicPage()
@Component({
  selector: 'page-custody-records',
  templateUrl: 'custody-records.html',
})
export class CustodyRecordsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustodyRecordsPage');
  }

}
