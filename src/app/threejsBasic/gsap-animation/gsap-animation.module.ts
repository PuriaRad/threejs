import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GsapAnimationRoutingModule } from './gsap-animation-routing.module';
import { GsapAnimationComponent } from './gsap-animation.component';


@NgModule({
  declarations: [
    GsapAnimationComponent
  ],
  imports: [
    CommonModule,
    GsapAnimationRoutingModule
  ]
})
export class GsapAnimationModule { }
