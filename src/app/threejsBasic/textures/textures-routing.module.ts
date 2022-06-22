import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TexturesComponent } from './textures.component';

const routes: Routes = [{ path: '', component: TexturesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TexturesRoutingModule { }
