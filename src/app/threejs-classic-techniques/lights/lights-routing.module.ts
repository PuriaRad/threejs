import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightsComponent } from './lights.component';

const routes: Routes = [{ path: '', component: LightsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightsRoutingModule { }
