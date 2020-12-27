import {
    BoxGeometry,
    Color,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    WebGLRenderer
} from "three";

class app {
    constructor() {
        this.scene = new Scene();

        const material = new MeshPhysicalMaterial();
        material.color = new Color(1, 0.2, 0.2);
        material.emissive = new Color(0.2, 0.2, 1);
        //material.roughness = 0.5;
       // material.metalness = 1;

        const cubeGeometry = new BoxGeometry();
        this.cube = new Mesh(cubeGeometry, material)
        this.cube.position.x = -1.2
        this.scene.add(this.cube);
        const sphereGeometry = new SphereGeometry(.7, 40, 40);
        this.sphere = new Mesh(sphereGeometry, material)
        this.sphere.position.x = 1.2
        this.scene.add(this.sphere);
        this.light = new PointLight();
        this.light.position.set(0, 3, 3)
        this.scene.add(this.light)

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
        this.sphere.rotateX(delta * 0.0001);
        this.sphere.rotateY(delta * 0.0002);
        this.sphere.rotateZ(delta * 0.0003);

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