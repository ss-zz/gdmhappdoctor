import { NgModule } from '@angular/core';

import { DicTransPipe } from './dic-trans/dic-trans';

/**
 * 管道模块
 */
@NgModule({
  declarations: [
    DicTransPipe
  ],
  imports: [
  ],
  exports: [
    DicTransPipe
  ]
})
export class PipesModule { }