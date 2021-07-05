import {ThreeWrapper} from './ThreeWrapper.js'

const threeWrapper = new ThreeWrapper();
const main = async()=>{
    await threeWrapper.shaderLoad();
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 60;
    const aspect = 2;
    const near = 0.1;
    const far = 200;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const cameraPole = new THREE.Object3D();
    scene.add(cameraPole);
    cameraPole.add(camera);

    const light = threeWrapper.createDirectionalLight();
    camera.add(light);

    const geometry = threeWrapper.createTorusGeometry();
    const material = threeWrapper.createShaderMaterial();
    
    const mesh = threeWrapper.createMesh(geometry,material)
    scene.add(mesh);

    const resizeRendererToDisplaySize = (renderer)=>{
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
        renderer.setSize(width, height, false);
        }
        return needResize;
    }


    const render = (time)=>{
        time *= 0.001;
        cameraPole.rotation.y = time * .3;

        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
main();
