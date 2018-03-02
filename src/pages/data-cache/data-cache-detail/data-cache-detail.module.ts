import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataCacheDetailPage } from './data-cache-detail';

@NgModule({
  declarations: [
    DataCacheDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DataCacheDetailPage),
  ],
})
export class DataCacheDetailPageModule {}
