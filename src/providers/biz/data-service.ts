import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpService';

/**
 * 数据获取服务
 */
@Injectable()
export class DataServiceProvider {

  constructor(
    private httpService: HttpService
  ) { }

  // 获取离线数据
  getOfflineData(pamars) {
    // return this.httpService.get('getOfflineData', pamars).map(res => res);
    // 临时
    return new Promise<Object>(resolve =>
      resolve([
        { name: '张三', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '李四', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '王五', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六10', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
        { name: '赵六10', time: new Date(), reason: '原因', infoInhos: '住院情况', infoLock: '关锁情况' },
      ])
    );
  }

  // 获取缓存数据
  getCacheData(pamars) {
    // return this.httpService.get('getCacheData', pamars).map(res => res);
    // 临时
    return new Promise<Object>(resolve =>
      resolve([
        { name: '李四', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四1', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四2', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四3', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四4', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四5', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四6', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四7', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四8', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四9', time: new Date(), hos: '广东省精神专科医院' },
        { name: '李四10', time: new Date(), hos: '广东省精神专科医院' },
      ])
    );
  }

}
