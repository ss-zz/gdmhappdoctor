import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService';
import { StorageKVService } from '../StorageKVService';

/**
 * 用户服务
 */
@Injectable()
export class UserServiceProvider {

  // 用户本地存储KEY
  private KEY_USERINFO = "userinfo";

  constructor(
    private httpService: HttpService,
    private kv: StorageKVService
  ) { }

  // 登录
  login(params) {
    return new Promise<Object>(resolve =>
      this.httpService.get('login', params)
        .subscribe((data: any) => {
          // 登录信息保存本地
          this.kv.set(this.KEY_USERINFO, data.user).then(() => {
            resolve(data);
          })
        })
    );
  }

  // 登出
  logout() {
    return this.kv.remove(this.KEY_USERINFO);
  }

  // 当前是否登录
  isLogin() {
    return new Promise<Boolean>(resolve =>
      this.getLoginInfo().then(data => {
        resolve(data ? true : false);
      })
    );
  }

  // 用户注册
  register(pamars) {
    return this.httpService.postForm('register', pamars).map(res => res);
  }

  // 登出
  userlogout() {
    return this.httpService.postForm('logout', null).map(res => res.json());
  }

  // 获取登录用户信息
  getLoginInfo() {
    return this.kv.get(this.KEY_USERINFO);
  }

  // 更新用户信息
  editUserinfo(pamars) {
    return this.httpService.postForm('platformuser/update', pamars).map(res => res);
  }

  // 意见反馈
  feedback(pamars) {
    return this.httpService.postForm('feedback', pamars).map(res => res);
  }

  // 获取用户头像
  public getAvatar(fileId) {
    return this.httpService.get('file/download/' + fileId).map(res => res);
  }

  // 修改密码
  changePassword(pamars) {
    return this.httpService.postForm('platformuser/changePwd', pamars);
  }

}
