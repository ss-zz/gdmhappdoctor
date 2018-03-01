import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 知识查看
 */

@IonicPage()
@Component({
  selector: 'page-knowledge-views',
  templateUrl: 'knowledge-views.html',
})
export class KnowledgeViewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KnowledgeViewsPage');
  }

}
