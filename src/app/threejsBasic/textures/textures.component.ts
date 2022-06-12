import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-textures',
  template: `
   <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class TexturesComponent implements OnInit {

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

  private renderer!: THREE.WebGLRenderer;

  private tick = () => {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  // // texture 
  // colorImage = new Image();
  // texture = new THREE.Texture(this.colorImage)

  loadingManager = new THREE.LoadingManager();
  textureLoader = new THREE.TextureLoader(this.loadingManager);
  // colorTexture = this.textureLoader.load('assets/textures/door/color.jpg');
  colorTexture = this.textureLoader.load('assets/textures/checkerboard-8x8.png');
  alphaTexture = this.textureLoader.load('assets/textures/door/alpha.jpg');
  heightTexture = this.textureLoader.load('assets/textures/door/height.jpg');
  normalTexture = this.textureLoader.load('assets/textures/door/normal.jpg');
  ambientOcclusionTexture = this.textureLoader.load('assets/textures/door/ambientOcclusion.jpg');
  metalnessTexture = this.textureLoader.load('assets/textures/door/metalness.jpg');
  roughnessTexture = this.textureLoader.load('assets/textures/door/roughness.jpg');

  constructor() {
    // this.colorImage.onload = () => {    
    //   this.texture.needsUpdate = true; 
    // }
    // this.colorImage.src = this.colorImageSrc;
    // this.loadingManager.onLoad = () => { console.log('onload'); }

    // this.colorTexture.repeat.x = 2;
    // this.colorTexture.repeat.y = 3;
    // this.colorTexture.wrapS = THREE.MirroredRepeatWrapping
    // this.colorTexture.wrapT = THREE.MirroredRepeatWrapping

    // this.colorTexture.offset.x = 0.5
    // this.colorTexture.minFilter = THREE.NearestFilter;
    this.colorTexture.generateMipmaps = false;
    this.colorTexture.magFilter = THREE.NearestFilter;
      
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

  @HostListener('window:dblclick', ['$event'])
  doubleClick() {
    if (!document.fullscreenElement) {
      this.canvas.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngAfterViewInit(): void {

    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshBasicMaterial({ map: this.colorTexture })
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

    this.tick();
  }
}
