import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';

@Component({
  selector: 'app-gsap-animation',
  template: `
    <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class GsapAnimationComponent implements OnInit {

  @ViewChild('canvas') private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  sizes = {
    width: 800,
    height: 600,
  };

  private scene = new THREE.Scene();

  private camera = new THREE.PerspectiveCamera(
    75,
    this.sizes.width / this.sizes.height,
  );
  private cube1!: THREE.Mesh;

  private renderer: any;

  // private time = Date.now();
  // private clock = new THREE.Clock();

  private tick = () => {

    // Time solution 
    // const currentTime = Date.now()
    // const deltaTime = currentTime - this.time;
    // this.time = currentTime;

    // // Clock
    // const elapsedTime = this.clock.getElapsedTime() * -2;

    // // this.cube1.position.x = elapsedTime;
    // this.camera.position.y = Math.sin(elapsedTime);
    // this.camera.position.x = Math.cos(elapsedTime);
    // this.camera.lookAt(this.cube1.position)

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    // Object
    const group = new THREE.Group();
    this.scene.add(group);

    this.cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );

    // const cube2 = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    // );
    // cube2.position.x = -2;

    // const cube3 = new THREE.Mesh(
    //   new THREE.BoxGeometry(1, 1, 1),
    //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    // );
    // cube3.position.x = 2;

    group.scale.y = 0.8;
    // group.rotation.y = 1;
    // group.add(cube1, cube2, cube3);
    group.add(this.cube1);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // this.camera.lookAt(new THREE.Vector3(3.0,0))
    // this.camera.lookAt(cube1.position);

    this.renderer = this.render();

    gsap.to(this.cube1.position, { duration: 1, delay: 1, x: 2 });
    gsap.to(this.cube1.position, { duration: 1, delay: 2, x: -2 });

    // animation 
    this.tick();
  }


  render() {
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    renderer.setSize(this.sizes.width, this.sizes.height);
    return renderer;
  }

}
