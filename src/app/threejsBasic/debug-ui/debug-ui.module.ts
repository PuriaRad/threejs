import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebugUiRoutingModule } from './debug-ui-routing.module';
import { DebugUiComponent } from './debug-ui.component';


@NgModule({
  declarations: [
    DebugUiComponent
  ],
  imports: [
    CommonModule,
    DebugUiRoutingModule
  ]
})
export class DebugUiModule { }
