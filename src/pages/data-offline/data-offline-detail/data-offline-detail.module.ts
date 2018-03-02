import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataOfflineDetailPage } from './data-offline-detail';

@NgModule({
  declarations: [
    DataOfflineDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DataOfflineDetailPage),
  ],
})
export class DataOfflineDetailPageModule {}
