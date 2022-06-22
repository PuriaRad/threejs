import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TexturesRoutingModule } from './textures-routing.module';
import { TexturesComponent } from './textures.component';


@NgModule({
  declarations: [
    TexturesComponent
  ],
  imports: [
    CommonModule,
    TexturesRoutingModule
  ]
})
export class TexturesModule { }
