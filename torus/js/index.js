import {ThreeWrapper} from './ThreeWrapper.js'

const threeWrapper = new ThreeWrapper();
const main = async()=>{
    const res_frag = await fetch("./js/shading.frag");
    const frag = await res_frag.text();

    const res_vert = await fetch("./js/shading.vert");
    const vert = await res_vert.text();

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
    const material = threeWrapper.createShaderMaterial(frag, vert);
    
    const mesh = threeWrapper.createMesh(geometry,material)
    scene.add(mesh);

    const mesh2 = threeWrapper.createMesh(geometry,material)
    scene.add(mesh2);
    mesh2.position.set(1.0,0.0,0.0);

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
        time += 0.001;
        // cameraPole.rotation.y = time * .3;
        mesh.rotation.y = time * 0.003;

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
