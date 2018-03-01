import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsManagerPage } from './patients-manager';

@NgModule({
  declarations: [
    PatientsManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsManagerPage),
  ],
})
export class PatientsManagerPageModule {}
