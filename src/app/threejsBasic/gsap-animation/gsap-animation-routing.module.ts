import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GsapAnimationComponent } from './gsap-animation.component';

const routes: Routes = [{ path: '', component: GsapAnimationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GsapAnimationRoutingModule { }
