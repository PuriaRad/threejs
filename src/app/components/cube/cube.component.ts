import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
})
export class CubeComponent implements OnInit, AfterViewInit {
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

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Object
    const group = new THREE.Group();
    this.scene.add(group);

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    cube2.position.x = -2;

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    );
    cube3.position.x = 2;

    group.scale.y = 0.8;
    group.rotation.y = 1;
    group.add(cube1, cube2, cube3);

    // Axes Helper
    const axesHelper = new THREE.AxesHelper(2);
    this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // this.camera.lookAt(new THREE.Vector3(3.0,0))
    // this.camera.lookAt(cube1.position);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.render(this.scene, this.camera);
  }
}
