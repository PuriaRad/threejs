import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'camera', loadChildren: () => import('./camera/camera.module').then(m => m.CameraModule) },
  { path: 'cube', loadChildren: () => import('./cube/cube.module').then(m => m.CubeModule) },
  { path: 'debug-ui', loadChildren: () => import('./debug-ui/debug-ui.module').then(m => m.DebugUiModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejsBasicRoutingModule { }
