import {ThreeWrapper} from './ThreeWrapper.js'

const threeWrapper = new ThreeWrapper();
const main = async()=>{

    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({canvas});

    const fov = 60;
    const aspect = 2;
    const near = 0.1;
    const far = 200;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#223322');

    const cameraPole = new THREE.Object3D();
    scene.add(cameraPole);
    cameraPole.add(camera);

    const light = threeWrapper.createDirectionalLight();
    camera.add(light);

    const geometry = threeWrapper.createTorusGeometry();
    

    const colors = [
        new THREE.Vector3(1, 0, 0), // 赤
        new THREE.Vector3(0, 1, 0), // 緑
        new THREE.Vector3(0, 0, 1)  // 青
    ];

    const meshes = [];
    for (let i = 0; i < 3; i++) {
        const material = await threeWrapper.createBasePassMaterial(colors[i]);
        const mesh = threeWrapper.createMesh(geometry, material);
        mesh.position.set((i - 1) * 2, 0, 0);
        scene.add(mesh);
        meshes.push(mesh);
    }


    // 2path目のレンダーターゲット
    const renderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight
    );
    
    const quadScene = new THREE.Scene();
    const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const quadGeometry = new THREE.PlaneGeometry(2, 2);

    const quadMaterial = await threeWrapper.createSobelMaterial();
    // const quadMaterial = await threeWrapper.createGrayScaleMaterial();

    const quadMesh = new THREE.Mesh(quadGeometry, quadMaterial);
    quadScene.add(quadMesh);

    const resizeRendererToDisplaySize = (renderer)=>{
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width  = canvas.clientWidth  * pixelRatio | 0;
        const height = canvas.clientHeight * pixelRatio | 0;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            renderTarget.setSize(width, height);
        }
        return needResize;
    }


    const render = (time)=>{
        time += 0.001;
        // cameraPole.rotation.y = time * .3;
        meshes.forEach(m => {
            m.rotation.y = time * 0.003;
        });

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
            renderTarget.setSize(canvas.width / 2, canvas.height);
        }

        const canvas = renderer.domElement;
        const width = canvas.width;
        const height = canvas.height;

        // 左半分 通常表示
        renderer.setScissorTest(true);
        renderer.setViewport(0, 0, width / 2, height);
        renderer.setScissor(0, 0, width / 2, height);
        camera.aspect = (width / 2) / height;
        camera.updateProjectionMatrix();
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);

        // オフスクリーンへ
        renderer.setRenderTarget(renderTarget);
        renderer.render(scene, camera);

        // 右半分：グレースケール
        quadMaterial.uniforms.tDiffuse.value = renderTarget.texture;
        renderer.setRenderTarget(null);
        renderer.setViewport(width / 2, 0, width / 2, height);
        renderer.setScissor(width / 2, 0, width / 2, height);
        renderer.render(quadScene, quadCamera);

        renderer.setScissorTest(false);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}
main();
