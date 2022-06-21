import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'lil-gui'

@Component({
  selector: 'app-materials',
  template: `
    <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class MaterialsComponent implements OnInit {

  // debug 
  private gui = new dat.GUI();

  private parameters = {
    color: '#ff3311',

  }


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
  private sphere!: THREE.Mesh;
  private plane!: THREE.Mesh;
  private torus!: THREE.Mesh;
  private material!: THREE.MeshStandardMaterial;
  private clock = new THREE.Clock();
  private renderer!: THREE.WebGLRenderer;

  cubeTextureLoader = new THREE.CubeTextureLoader();
  environmentMapTexture = this.cubeTextureLoader.load([
    'assets/textures/environmentMaps/0/px.jpg',
    'assets/textures/environmentMaps/0/nx.jpg',
    'assets/textures/environmentMaps/0/py.jpg',
    'assets/textures/environmentMaps/0/ny.jpg',
    'assets/textures/environmentMaps/0/pz.jpg',
    'assets/textures/environmentMaps/0/nz.jpg',
  ])

  textureLoader = new THREE.TextureLoader();
  doorColorTexture = this.textureLoader.load('assets/textures/door/color.jpg');
  doorAlphaTexture = this.textureLoader.load('assets/textures/door/alpha.jpg');
  doorAmbientOcclusionTexture = this.textureLoader.load('assets/textures/door/ambientOcclusion.jpg');
  doorHeightTexture = this.textureLoader.load('assets/textures/door/height.jpg');
  doorMetalnessTexture = this.textureLoader.load('assets/textures/door/metalness.jpg');
  doorNormalTexture = this.textureLoader.load('assets/textures/door/normal.jpg');
  doorRoughnessTexture = this.textureLoader.load('assets/textures/door/roughness.jpg');

  matcapTexture = this.textureLoader.load('assets/textures/matcaps/3.png');
  gradientTexture = this.textureLoader.load('assets/textures/gradients/5.jpg');


  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  pointLight = new THREE.PointLight(0xffffff, 0.5);


  private tick = () => {
    const elapsedTime = this.clock.getElapsedTime();

    this.sphere.rotation.y = 0.1 * elapsedTime;
    this.plane.rotation.y = 0.1 * elapsedTime;
    this.torus.rotation.y = 0.1 * elapsedTime;


    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.tick);
  }

  constructor() {
    // this.matcapTexture.minFilter = THREE.NearestMipmapLinearFilter;
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
    this.pointLight.position.x = 2;
    this.pointLight.position.y = 3;
    this.pointLight.position.z = 4;

    this.scene.add(this.ambientLight);
    this.scene.add(this.pointLight);

    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(2);
    // this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 3
    this.scene.add(this.camera)

    // controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    // objects
    // const material = new THREE.MeshBasicMaterial()
    // material.map = this.doorColorTexture;
    // material.color.set('#00ff00');
    // // material.opacity = 0.5;
    // material.transparent = true;
    // material.alphaMap = this.doorAlphaTexture;
    // material.side = THREE.DoubleSide;

    // const material = new THREE.MeshNormalMaterial();
    // material.flatShading = true;

    // const material = new THREE.MeshMatcapMaterial();
    // material.matcap = this.matcapTexture;

    // const material = new THREE.MeshDepthMaterial();

    // const material = new THREE.MeshLambertMaterial(); // good performance but a bit nasty result with edges

    // const material = new THREE.MeshPhongMaterial(); // better result but weird light reflection
    // material.shininess = 10;
    // material.specular.set('red');

    // const material = new THREE.MeshToonMaterial();
    // this.gradientTexture.minFilter = THREE.NearestFilter;
    // this.gradientTexture.magFilter = THREE.NearestFilter;
    // this.gradientTexture.generateMipmaps = false;
    // material.gradientMap = this.gradientTexture;

    this.material = new THREE.MeshStandardMaterial(); // the most important one
////////////////////////////////////////////////////////    // this.material.map = this.doorColorTexture;
    // this.material.roughnessMap = this.doorRoughnessTexture;
    // this.material.metalnessMap = this.doorMetalnessTexture;

    // this.material.alphaMap = this.doorAlphaTexture;
    // this.material.transparent = true;
    // this.material.aoMap = this.doorAmbientOcclusionTexture;
    // this.material.aoMapIntensity = 1;
    // this.material.displacementMap = this.doorHeightTexture;
    // this.material.displacementScale = 0.06
    // this.material.normalMap = this.doorNormalTexture;
    // this.material.normalScale.set(0.5,0.5)

    this.material.metalness = 0.7;
    this.material.roughness = 0.2;

    // env
    this.material.envMap = this.environmentMapTexture;

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      this.material,
    );
    this.sphere.position.x = -1.5;

    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 100, 100),
      this.material
    );
    this.plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(
      this.plane.geometry.attributes['uv'].array, 2
    ))

    this.torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 64, 128),
      this.material
    );
    this.torus.position.x = 1.5;

    this.scene.add(this.sphere, this.plane, this.torus);


    //renderer 
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
    // this.gui
    // .add(this.material, 'metalness')
    // .min(0)
    // .max(1)
    // .step(0.0001);

    // this.gui
    // .add(this.material, 'roughness')
    // .min(0)
    // .max(1)
    // .step(0.0001);
  }
}
