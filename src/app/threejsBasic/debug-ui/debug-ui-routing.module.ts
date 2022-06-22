import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DebugUiComponent } from './debug-ui.component';

const routes: Routes = [{ path: '', component: DebugUiComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebugUiRoutingModule { }
