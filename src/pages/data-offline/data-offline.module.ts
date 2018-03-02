import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DataOfflinePage } from './data-offline';

@NgModule({
  declarations: [
    DataOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(DataOfflinePage),
  ],
})
export class DataOfflinePageModule {}
