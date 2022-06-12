import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarComponent } from './d3/bar/bar.component';
import { PieComponent } from './d3/pie/pie.component';
import { ScatterComponent } from './d3/scatter/scatter.component';
import { CubeComponent } from './threejsBasic/cube/cube.component';
import { GsapAnimationComponent } from './threejsBasic/gsap-animation/gsap-animation.component';
import { CameraComponent } from './threejsBasic/camera/camera.component';
import { FullscreenAndResizingComponent } from './threejsBasic/fullscreen-and-resizing/fullscreen-and-resizing.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    PieComponent,
    ScatterComponent,
    CubeComponent,
    GsapAnimationComponent,
    CameraComponent,
    FullscreenAndResizingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
