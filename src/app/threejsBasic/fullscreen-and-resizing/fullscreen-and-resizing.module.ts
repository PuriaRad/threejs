import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FullscreenAndResizingRoutingModule } from './fullscreen-and-resizing-routing.module';
import { FullscreenAndResizingComponent } from './fullscreen-and-resizing.component';


@NgModule({
  declarations: [
    FullscreenAndResizingComponent
  ],
  imports: [
    CommonModule,
   FullscreenAndResizingRoutingModule
  ]
})
export class FullscreenAndResizingModule { }
