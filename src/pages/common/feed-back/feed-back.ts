import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserServiceProvider } from "../../../providers/biz/user-service";
import { NativeService } from "../../../providers/NativeService";
import { ImgService } from '../../../providers/ImgService';

/**
 * 意见反馈
 */
@IonicPage()
@Component({
  selector: 'page-feed-back',
  templateUrl: 'feed-back.html',
})
export class FeedBackPage {

  // 页面参数
  params = {
    content: "", imgs: [
      { src: 'assets/img/bg/home.jpeg' },
      { src: 'assets/img/bg/home.jpeg' },
      { src: 'assets/img/bg/home.jpeg' },
      { src: 'assets/img/bg/home.jpeg' },
    ]
  };

  constructor(private userService: UserServiceProvider, private nativeService: NativeService, private imgService: ImgService) {
  }

  // 提交
  submit() {
    this.userService.feedback(this.params).subscribe(data => {
      this.nativeService.showToast('意见反馈成功');
    })
  }

  // 添加图片
  addImg() {
    this.imgService.selectPhoto().then((imgData: any) => {
      this.params.imgs.push({ src: imgData });
    })
  }

  // 移除图片
  removeImg(idx) {

  }

}
