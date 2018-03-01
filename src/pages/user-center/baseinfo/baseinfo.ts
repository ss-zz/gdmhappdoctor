import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-baseinfo',
  templateUrl: 'baseinfo.html',
})
export class BaseinfoPage {

  // 默认步骤
  step = 1;
  // 是否来源于注册跳转
  isFromReg = true;
  // 各个阶段标题
  titles = ['基础信息', '证件信息', '家庭信息', '教育信息', '工作信息', '健康信息', '旅行信息', '附件信息'];
  // 最大步骤
  maxStep = this.titles.length;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.isFromReg = this.navParams.get("isFromReg");
    console.dir(this.navParams.get("isFromReg"));
  }

  back() {
    this.navCtrl.pop();
  }

  // 跳转到步骤
  toStep(step, isClick) {
    if (isClick) {// 是否点击菜单
      if (this.isFromReg) {// 来源于注册
        return;
      }
    }
    this.step = step;
  }

  // 保存
  save() {
    if (this.valid()) {
      // 保存逻辑
    }
  }

  // 保存并下一步
  saveAndNext() {
    this.save();
    this.next();
  }

  // 下一步
  next() {
    if (this.step == this.maxStep) {
      this.navCtrl.setRoot(TabsPage);
    } else {
      this.toStep(this.step + 1, false);
    }
  }

  // 校验表单
  valid() {
    return true;
  }

}
