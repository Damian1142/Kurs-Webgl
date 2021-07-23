import {
    AmbientLight,
    BoxGeometry,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    SphereGeometry,
    TextureLoader,
    Vector2, Vector3,
    WebGLRenderer
} from "three";

class app {
    constructor() {
        this.scene = new Scene();

        this.light = new PointLight();
        this.light.position.set(0, 3, 3)
        this.scene.add(this.light)
        this.light2 = new AmbientLight();
        this.light2.intensity = 0.2
        this.scene.add(this.light2)

        const material1 = new MeshPhysicalMaterial();
        const material2 = new MeshPhysicalMaterial();
        this.loadTexture('https://rawcdn.githack.com/matrix0123456789/Kurs-Webgl/4e7c0bab3d803bee501ae3a7778e2e2bc4b826b0/012%20-%20Tekstury%202/earthmap1k.jpg?raw=true').then(t => {
            material2.normalMap = t;
            material2.needsUpdate = true;
        });


        const boxGeometry = new BoxGeometry(1,1);
        this.box1 = new Mesh(boxGeometry, material1)
        this.box1.position.x = -1
        this.scene.add(this.box1);
        this.box2 = new Mesh(boxGeometry, material2)
        this.box2.position.x = +1
        this.scene.add(this.box2);

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


        this.box1.rotateX(delta * 0.0001);
        this.box2.rotateX(delta * 0.0001);
        this.box1.rotateY(delta * 0.00019);
        this.box2.rotateY(delta * 0.00019);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

    adaptSize() {
        this.renderer.setSize(this.domElement.clientWidth, this.domElement.clientHeight);
        this.renderer.setPixelRatio(devicePixelRatio);
        this.camera.aspect = this.domElement.clientWidth / this.domElement.clientHeight;
        this.camera.updateProjectionMatrix();
    }

    loadTexture(url) {
        return new Promise((resolve, reject) => {
            const loader = new TextureLoader();
            loader.load(url, resolve, undefined, reject);
        });
    }

}

document.body.append((new app()).domElement);
