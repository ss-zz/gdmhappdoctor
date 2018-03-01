import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustodyRecordsPage } from './custody-records';

@NgModule({
  declarations: [
    CustodyRecordsPage,
  ],
  imports: [
    IonicPageModule.forChild(CustodyRecordsPage),
  ],
})
export class CustodyRecordsPageModule {}
