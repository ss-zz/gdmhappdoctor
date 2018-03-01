import { Component, ViewChild } from '@angular/core';
import { Tabs } from 'ionic-angular';

/**
 * 底部导航
 */
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  @ViewChild('mainTabs') tabs: Tabs;

  tab1Root = 'HomePage';
  tab2Root = 'ConsultOnlinePage';
  tab3Root = 'PatientsManagerPage';
  tab4Root = 'CustodyRecordsPage';
  tab5Root = 'KnowledgeViewsPage';

}
