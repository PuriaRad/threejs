import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'camera', loadChildren: () => import('./camera/camera.module').then(m => m.CameraModule) },
  { path: 'cube', loadChildren: () => import('./cube/cube.module').then(m => m.CubeModule) },
  { path: 'debug-ui', loadChildren: () => import('./debug-ui/debug-ui.module').then(m => m.DebugUiModule) },
  { path: 'fullscreen-and-resizing', loadChildren: () => import('./fullscreen-and-resizing/fullscreen-and-resizing.module').then(m => m.FullscreenAndResizingModule) },
  { path: 'geometries', loadChildren: () => import('./geometries/geometries.module').then(m => m.GeometriesModule) },
  { path: 'gsap-animation', loadChildren: () => import('./gsap-animation/gsap-animation.module').then(m => m.GsapAnimationModule) },
  { path: 'materials', loadChildren: () => import('./materials/materials.module').then(m => m.MaterialsModule) },
  { path: 'text', loadChildren: () => import('./text/text.module').then(m => m.TextModule) },
  { path: 'textures', loadChildren: () => import('./textures/textures.module').then(m => m.TexturesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreejsBasicRoutingModule { }
