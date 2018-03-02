import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/biz/data-service';

/**
 * 离线数据
 */

@IonicPage()
@Component({
  selector: 'page-data-offline',
  templateUrl: 'data-offline.html',
})
export class DataOfflinePage {

  // 列表数据
  items = [];
  //查询参数
  params = { page: 1, rows: 10 };
  // 是否有更多
  hasmore = true;

  constructor(public dataServiceProvider: DataServiceProvider) {

  }

  // 页面进入加载
  ionViewDidLoad() {
    // 刷新数据
    this.doRefresh(null);
  }

  // 下拉刷新
  doRefresh(refresher) {
    this.params.page = 1;
    this.loadData().then((data: any) => {
      this.renderItems(data, true);
      if (refresher) {
        refresher.complete();
      }
    }).catch(() => {
      if (refresher) {
        refresher.complete();
      }
    });
  }

  // 滚动加载
  doInfinite() {
    return new Promise((resolve) => {
      this.loadData().then((data: any) => {
        this.renderItems(data, false);
        this.params.page = this.params.page + 1;
        resolve();
      });
    })
  }

  // 加载数据
  loadData() {
    return this.dataServiceProvider.getOfflineData(this.params);
  }

  // 渲染数据
  renderItems(data, reset) {
    data = data || [];
    if (reset) {
      this.items = data;
    } else {
      this.items = this.items.concat(data);
      if (data.length < this.params.rows) {
        this.hasmore = false;
      } else {
        this.hasmore = true;
      }
    }

  }

}
