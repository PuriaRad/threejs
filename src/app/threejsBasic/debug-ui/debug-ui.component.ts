import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import * as dat from 'lil-gui'


@Component({
  selector: 'app-debug-ui',
  template: `
       <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class DebugUiComponent implements OnInit {

  // debug 
  private gui = new dat.GUI();

  private parameters = {
    color: '#ff3311',
    spin: () => {
      gsap.to(this.mesh.rotation, { y: this.mesh.rotation.y + 10, duration: 1 })
    }
  }


  // base
  @ViewChild('canvas') private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef?.nativeElement;
  }

  private sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  private scene = new THREE.Scene();

  private camera = new THREE.PerspectiveCamera(
    75,
    this.sizes.width / this.sizes.height,
    0.1, 100
  );

  private controls!: OrbitControls;

  private mesh!: THREE.Mesh;
  private material!: THREE.MeshBasicMaterial;

  private renderer!: THREE.WebGLRenderer;

  private tick = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:resize', ['$event'])
  onMouseMove() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // if you move the window to another screen with different pixelRatio
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // @HostListener('window:dblclick', ['$event'])
  // doubleClick() {
  //   if (!document.fullscreenElement) {
  //     this.canvas.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  // }

  ngAfterViewInit(): void {
    this.material = new THREE.MeshBasicMaterial({ color: this.parameters.color });

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
      this.material
    )
    this.scene.add(this.mesh);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 3
    this.camera.lookAt(this.mesh.position)
    this.scene.add(this.camera)

    // controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    // limit pixel ration to get much better performance
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.debug();
    this.tick();
  }


  debug() {
    this.gui
      .add(this.mesh.position, 'y')
      .min(-3)
      .max(3)
      .step(0.01)
      .name('y position');

    this.gui
      .add(this.mesh, 'visible')

    this.gui
      .add(this.material, 'wireframe')

    this.gui
      .addColor(this.parameters, 'color')
      .onChange(() => {
        this.material.color.set(this.parameters.color);
      })

    this.gui
      .add(this.parameters, 'spin')
  }

}

