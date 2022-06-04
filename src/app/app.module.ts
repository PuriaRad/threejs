import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './components/bar/bar.component';
import { PieComponent } from './components/pie/pie.component';
import { ScatterComponent } from './components/scatter/scatter.component';
import { CubeComponent } from './components/cube/cube.component';
import { GsapAnimationComponent } from './components/gsap-animation/gsap-animation.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    CubeComponent,
    GsapAnimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
