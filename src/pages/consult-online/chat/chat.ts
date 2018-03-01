import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * 聊天
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  // 标题
  title: string;
  // 聊天记录
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // 获取标题
    this.title = this.navParams.get('title') || '未知';

    // 获取聊天记录
    this.items = [
      { content: '您好，我是XXX，现在想和您沟通一下，您时间方便么？', createTime: new Date(), myself: true },
      { content: '抱歉，XXXXXX。', createTime: new Date(), myself: false },
      { content: '不好意思，打扰了。', createTime: new Date(), myself: true },
    ];

  }

}
