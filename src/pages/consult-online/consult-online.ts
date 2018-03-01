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

  // 用户类型：1-村居直报，2-服务患者
  type: string;

  // 用户数据-村居直报
  itemsType1 = [];
  // 用户数据-服务患者
  itemsType2 = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = '1';
  }

  ionViewDidLoad() {
    // 加载用户数据
    this.itemsType1 = [
      { name: '李晓莉', desc: '下属医生', address: '广东省XX村卫生院' },
      { name: '周军', desc: '下属医生', address: '广东省XX村卫生院' },
    ]
    this.itemsType2 = [
      { name: '张三', desc: '抑郁症', address: '广东省XX村卫生院' },
      { name: '李四', desc: '抑郁症', address: '广东省XX村卫生院' },
    ]
  }

}
