import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <!-- <header>
      <h1>Angular + Three js</h1>
    </header> -->
  
   <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'd3test';
}
