import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullscreenAndResizingComponent } from './fullscreen-and-resizing.component';

const routes: Routes = [{ path: '', component: FullscreenAndResizingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullscreenAndResizingRoutingModule { }
