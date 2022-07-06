import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

@Component({
  selector: 'app-lights',
  template: `
    <canvas #canvas id="canvas" style=" border: 1px solid black"></canvas>
  `,
  styles: [
  ]
})
export class LightsComponent implements OnInit {

  // debug 
  private gui = new dat.GUI();

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
  private cube!: THREE.Mesh;

  private material!: THREE.MeshStandardMaterial;
  private clock = new THREE.Clock();
  private renderer!: THREE.WebGLRenderer;

  // light
  private ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // like the sun
  private directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
  // good for grass and sky 
  private hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3);
  private pointLight = new THREE.PointLight(0xff9000, 0.5, 1);
  // only works on standard and physical materials
  private rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
  private spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);

  // based on performance 
  // ambient and hemisphere are minimal
  // directional and point are moderate
  // spotLight and rectArea high cost

  private tick = () => {
    const elapsedTime = this.clock.getElapsedTime();

    this.sphere.rotation.y = 0.1 * elapsedTime;
    this.cube.rotation.y = 0.1 * elapsedTime;
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

  ngAfterViewInit(): void {
    this.lightGenerator();

    // Axes Helper
    // const axesHelper = new THREE.AxesHelper(2);
    // this.scene.add(axesHelper);

    // Camera
    this.camera.position.z = 3
    this.scene.add(this.camera)

    // controls
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;

    this.material = new THREE.MeshStandardMaterial()
    this.material.roughness = 0.4;

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      this.material,
    );
    this.sphere.position.x = -1.5;


    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.75, 0.75),
      this.material
    )

    this.torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.2, 64, 128),
      this.material
    );
    this.torus.position.x = 1.5;

    this.plane = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      this.material
    );
    this.plane.rotation.x = - Math.PI * 0.5
    this.plane.position.y = - 0.65

    this.scene.add(this.sphere, this.plane, this.torus, this.cube);


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
    this.gui
      .add(this.directionalLight.position, 'x')
      .name('directionalLight x')
      .min(-10)
      .max(10)
      .step(1);
    this.gui
      .add(this.pointLight.position, 'y')
      .name('pointLightHeight')
      .min(-10)
      .max(10)
      .step(1);
  }

  private lightGenerator() {
    this.directionalLight.position.set(1, 0.25, 0)
    this.pointLight.position.set(1, -0.5, 1);
    this.rectAreaLight.position.set(-1.5, 0, 1.5);
    this.rectAreaLight.lookAt(new THREE.Vector3());
    this.spotLight.position.set(0, 2, 3);
    this.scene.add(this.spotLight.target);
    this.spotLight.target.position.x = -0.75;
    this.scene.add(this.ambientLight);
    this.scene.add(this.directionalLight);
    this.scene.add(this.hemisphereLight);
    this.scene.add(this.pointLight);
    this.scene.add(this.rectAreaLight);
    this.scene.add(this.spotLight);
  }
}
