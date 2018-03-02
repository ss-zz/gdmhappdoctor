import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataCachePage } from './data-cache';

@NgModule({
  declarations: [
    DataCachePage,
  ],
  imports: [
    IonicPageModule.forChild(DataCachePage),
  ],
})
export class DataCachePageModule {}
