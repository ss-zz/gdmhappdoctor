import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { KnowledgeViewsPage } from './knowledge-views';

@NgModule({
  declarations: [
    KnowledgeViewsPage,
  ],
  imports: [
    IonicPageModule.forChild(KnowledgeViewsPage),
  ],
})
export class KnowledgeViewsPageModule {}
