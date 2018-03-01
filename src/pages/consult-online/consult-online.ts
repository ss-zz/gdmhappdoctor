import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 在线咨询
 */

@IonicPage()
@Component({
  selector: 'page-consult-online',
  templateUrl: 'consult-online.html',
})
export class ConsultOnlinePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultOnlinePage');
  }

}
