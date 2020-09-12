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
        this.domElement = document.createElement('div');
        this.domElement.classList.add("webglWrapper")
        this.domElement.appendChild(this.renderer.domElement);
        this.adaptSize();
        if ("ResizeObserver" in window) {
            this.resizeObserver = new ResizeObserver(this.adaptSize.bind(this))
            this.resizeObserver.observe(this.domElement);
        }
        addEventListener('resize', this.adaptSize.bind(this))
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

    adaptSize() {
        this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
        this.renderer.setPixelRatio(devicePixelRatio);
        this.camera.aspect = this.domElement.clientWidth / this.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
    }
}

document.body.append((new app()).domElement);