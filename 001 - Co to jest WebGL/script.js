import {BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer} from "three";

class app {
    constructor() {
        this.scene = new Scene();
        const material = new MeshNormalMaterial();
        const geometry = new BoxGeometry();
        this.cube = new Mesh(geometry, material)
        this.scene.add(this.cube);
        this.camera = new PerspectiveCamera();
        this.camera.position.set(0, 0, 3);
        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setSize(640, 480);
        this.lastRender = new Date();
        this.render();
    }

    render() {
        const currentDate = new Date();
        const delta = currentDate - this.lastRender;
        this.lastRender = currentDate;

        this.cube.rotateX(delta * 0.0001);
        this.cube.rotateY(delta * 0.0002);
        this.cube.rotateZ(delta * 0.0003);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    get domElement() {
        return this.renderer.domElement;
    }
}

document.body.append((new app()).domElement);