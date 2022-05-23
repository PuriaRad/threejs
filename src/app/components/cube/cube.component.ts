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
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    cubeGeometry.rotateY(20);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: '#ff2000',
    });
    const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
    this.scene.add(cubeMesh);

    // Camera
    this.camera.position.z = 3;
    this.scene.add(this.camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.render(this.scene, this.camera);
  }
}
