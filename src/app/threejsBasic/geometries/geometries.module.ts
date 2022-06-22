import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {GeometriesRoutingModule } from './geometries-routing.module';
import { GeometriesComponent } from './geometries.component';


@NgModule({
  declarations: [
    GeometriesComponent
  ],
  imports: [
    CommonModule,
   GeometriesRoutingModule
  ]
})
export class GeometriesModule { }
