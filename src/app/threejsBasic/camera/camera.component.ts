import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-camera',
  template: `
    <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class CameraComponent implements OnInit, AfterViewInit {

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
    0.1, 100
  );

  private controls!: OrbitControls;

  // private aspectRation = this.sizes.width / this.sizes.height;
  // private camera = new THREE.OrthographicCamera(
  //   -1 * this.aspectRation,
  //   1 * this.aspectRation,
  //   1,
  //   -1,
  //   0.1, 100
  // );
  private mesh!: THREE.Mesh;
  private clock = new THREE.Clock()

  private renderer: any;

  private tick = () => {
    // const elapsedTime = this.clock.getElapsedTime()
    // this.mesh.rotation.y = elapsedTime;

    // this.camera.position.x = Math.sin(this.cursor.x * Math.PI * 2) * 3;
    // this.camera.position.z = Math.cos(this.cursor.x * Math.PI * 2) * 3

    // this.camera.position.y = this.cursor.y * 5;
    // this.camera.lookAt(this.mesh.position)

    this.controls.update();

    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  cursor = {
    x: 0,
    y: 0
  }

  constructor() { }

  ngOnInit(): void { }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.cursor.x = event.clientX / this.sizes.width - 0.5;
    this.cursor.y = -(event.clientY / this.sizes.height - 0.5);

  }


  ngAfterViewInit(): void {

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    )
    this.scene.add(this.mesh);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    // Camera
    // this.camera.position.x = 2
    // this.camera.position.y = 2
    this.camera.position.z = 3
    this.camera.lookAt(this.mesh.position)
    this.scene.add(this.camera)

    // controls
    this.controls = new OrbitControls(this.camera,this.canvas);
    // controls.target.y = 2;
    // controls.update();
    this.controls.enableDamping = true;
    
    this.renderer = this.render();

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
