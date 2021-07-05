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
    camera.position.z = 1;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('white');

    const planeGeometry = threeWrapper.createPlaneGeometory();
    const phongMaterial = threeWrapper.createShaderMaterial();
    const plane = threeWrapper.createMesh(planeGeometry,phongMaterial)
    scene.add(plane);

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

    // renderer.setFaceCulling( THREE.CullFaceNone );
    const render = (time)=>{
        if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        }

        plane.material.uniforms.time.value = time;

        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
main();
