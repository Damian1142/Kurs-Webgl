import {
    BoxGeometry,
    ConeGeometry,
    CylinderGeometry,
    Mesh,
    MeshNormalMaterial,
    PerspectiveCamera,
    Scene,
    WebGLRenderer
} from "three";

class app {
    constructor() {
        this.scene = new Scene();
        const material = new MeshNormalMaterial();

        const geometry1 = new BoxGeometry();
        this.item1 = new Mesh(geometry1, material)
        this.scene.add(this.item1);

        const geometry2 = new ConeGeometry(.3,1, 30);
        this.item2 = new Mesh(geometry2, material)
        this.item1.add(this.item2);

        const geometry3 = new CylinderGeometry(.3,.3,1,30);
        this.item3 = new Mesh(geometry3, material)
        this.item2.add(this.item3);

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
        this.render();
    }

    render() {

        this.item1.position.x = readValue('position1');
        this.item1.scale.setScalar(readValue('scale1'));
        this.item1.rotation.x = readValue('rotation1')

        this.item2.position.x = readValue('position2');
        this.item2.scale.setScalar(readValue('scale2'));
        this.item2.rotation.x = readValue('rotation2')

        this.item3.position.x = readValue('position3');
        this.item3.scale.setScalar(readValue('scale3'));
        this.item3.rotation.x = readValue('rotation3')

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


function readValue(name) {
    const input = document.querySelector(`.controls label[data-name="${name}"] input`);
    return input ? input.value : 0;
}