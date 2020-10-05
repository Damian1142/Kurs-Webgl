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
        this.render();
    }

    render() {

        this.cube.position.x = readValue('positionX');
        this.cube.position.y = readValue('positionY');
        this.cube.position.z = readValue('positionZ');
        this.cube.scale.x = readValue('scaleX');
        this.cube.scale.y = readValue('scaleY');
        this.cube.scale.z = readValue('scaleZ');
        this.cube.rotation.x = readValue('rotationX')
        this.cube.rotation.y = readValue('rotationY')
        this.cube.rotation.z = readValue('rotationZ')

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
        this.cube.rotation.set(Math.PI, 0.5 * Math.PI, 0, 'XYZ')
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