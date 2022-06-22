import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 'path': '', component: HomeComponent },
  {
    path: 'basic',
    loadChildren: () =>
      import(
        './threejsBasic/threejs-basic.module'
      ).then((m) => m.ThreejsBasic),
  },
  {
    path: 'classic-techniques',
    loadChildren: () =>
      import(
        './threejs-classic-techniques/threejs-classic-techniques.module'
      ).then((m) => m.ThreejsClassicTechniquesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
