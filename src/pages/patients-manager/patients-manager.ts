import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 患者管理
 */

@IonicPage()
@Component({
  selector: 'page-patients-manager',
  templateUrl: 'patients-manager.html',
})
export class PatientsManagerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PatientsManagerPage');
  }

}
