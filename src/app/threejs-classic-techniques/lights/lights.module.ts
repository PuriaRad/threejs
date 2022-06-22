import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LightsRoutingModule } from './lights-routing.module';
import { LightsComponent } from './lights.component';


@NgModule({
  declarations: [
    LightsComponent
  ],
  imports: [
    CommonModule,
    LightsRoutingModule
  ]
})
export class LightsModule { }
