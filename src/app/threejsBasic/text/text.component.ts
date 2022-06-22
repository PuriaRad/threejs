import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

import gsap from 'gsap';
import * as dat from 'lil-gui';


@Component({
  selector: 'app-text',
  template: `
     <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class TextComponent implements OnInit {

  // debug 
  private gui = new dat.GUI();

  private parameters = {
    color: '#ff3311',
    spin: () => {
      gsap.to(this.textMesh.rotation, { y: this.textMesh.rotation.y + 10, duration: 1 })
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

  private textGeometry!: TextGeometry;
  private textMaterial!: THREE.MeshMatcapMaterial;
  private textMesh!: THREE.Mesh;

  private renderer!: THREE.WebGLRenderer;

  fontLoader = new FontLoader();
  textureLoader = new THREE.TextureLoader();
  matcapTexture = this.textureLoader.load('assets/textures/matcaps/4.png');

  private tick = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  constructor() {

  }

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

  async ngAfterViewInit() {
    await this.renderText();
    await this.generateDoughnuts();
    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(2);
    // this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 3
    this.camera.lookAt(this.textMesh?.position)
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
      .add(this.textMesh.position, 'y')
      .min(-3)
      .max(3)
      .step(0.01)
      .name('y position');

    this.gui
      .add(this.textMesh, 'visible')

    // this.gui
    //   .add(this.textMaterial, 'wireframe')

    this.gui
      .addColor(this.parameters, 'color')
      .onChange(() => {
        this.textMaterial.color.set(this.parameters.color);
      })

    this.gui
      .add(this.parameters, 'spin')
  }

  async renderText() {
    return new Promise(resolve => {
      this.fontLoader.load(
        'assets/fonts/helvetiker_regular.typeface.json',
        (font) => {
          this.textGeometry = new TextGeometry(
            'Puria',
            {
              font,
              size: 0.5,
              height: 0.2,
              curveSegments: 5,
              bevelEnabled: true,
              bevelThickness: 0.03,
              bevelSize: 0.02,
              bevelOffset: 0,
              bevelSegments: 4,
            }
          );
          // this.textGeometry.computeBoundingBox();
          // this.textGeometry.translate(
          //   -(this.textGeometry.boundingBox!.max.x - 0.2) * 0.5,
          //   -(this.textGeometry.boundingBox!.max.y - 0.02) * 0.5,
          //   -(this.textGeometry.boundingBox!.max.z - 0.03) * 0.5,
          // );
          this.textGeometry.center();

          this.textMaterial = new THREE.MeshMatcapMaterial({
            matcap: this.matcapTexture
          });
          this.textMesh = new THREE.Mesh(this.textGeometry, this.textMaterial);
          this.scene.add(this.textMesh);
          resolve(undefined);
        }
      )
    })
  }

  async generateDoughnuts() {
    const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 150; i++) {

      const donut = new THREE.Mesh(donutGeometry, this.textMaterial);
      donut.position.x = (Math.random() - 0.5) * 20;
      donut.position.y = (Math.random() - 0.5) * 20;
      donut.position.z = (Math.random() - 0.5) * 20;
      donut.rotation.x = Math.random() * Math.PI
      donut.rotation.y = Math.random() * Math.PI

      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      this.scene.add(donut);
    }
  }
}

