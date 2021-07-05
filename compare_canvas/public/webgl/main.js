import * as THREE from "./three/three.module.js";

const CANVAS_WIDTH = 628;
const CANVAS_HEIGHT = 837;

const main = async()=>{
    const res_frag = await fetch("board.frag");
    const frag = await res_frag.text();

    const res_vert = await fetch("board.vert");
    const vert = await res_vert.text();

    const loader = new THREE.TextureLoader();
    const texture = await loader.load("/webgl/hamburger.jpg");

    const body = document.getElementsByTagName("body")[0];

    const canvas = document.createElement("canvas");

    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    canvas.style.width = CANVAS_WIDTH;
    canvas.style.height = CANVAS_HEIGHT;
    body.appendChild(canvas);

    const sliderEvent = ()=>{
        // console.log(sliderR.value);
        // console.log(sliderG.value);
        // console.log(sliderB.value);
        colorChanged(sliderR.value,sliderG.value,sliderB.value);
    }

    const sliderR = createSlider();
    sliderR.addEventListener("input",sliderEvent);
    body.appendChild(sliderR);

    const sliderG = createSlider();
    sliderG.addEventListener("input",sliderEvent);
    body.appendChild(sliderG);

    const sliderB = createSlider();
    sliderB.addEventListener("input",sliderEvent);
    body.appendChild(sliderB);

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x0000FF, 1);
    const camera = new THREE.OrthographicCamera( canvas.width / - 2, canvas.width / 2, canvas.height / 2, canvas.height / - 2, 0.001, 10000 );
    camera.position.set(0,0,0);

    scene.add(camera);

    const sprite = createSprite(vert, frag, texture);
    scene.add(sprite);

    // const ctx = canvas.getContext("webgl");
    // const img = await loadImage("./hamburger.jpg");
    // ctx.drawImage(img, 0, 0);
    // const originalImage = ctx.getImageData(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // // console.log(originalImage.data)


    const colorChanged = (r,g,b)=>{
        sprite.material.uniforms.uColor.value = new THREE.Vector4(r,g,b,1.0);
    }

    renderer.setAnimationLoop((timestamp)=>{
        // sprite.material.uniforms.uColor.value = new THREE.Vector4();
        renderer.render( scene, camera );
    });
}

const createSprite = (vert, frag, texture)=>{
    const geometry = new THREE.PlaneGeometry(1,1);
    geometry.scale(1,1,1);
    // const material = new THREE.SpriteMaterial({
    //     map:new THREE.TextureLoader().load('/webgl/hamburger.jpg'),
    //     transparent: true,
    // });
    
    const material = new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        uniforms:{
            uTex:{
                type:"t",
                value:texture
            },
            uColor:{
                value: new THREE.Vector4(1.0, 1.0, 1.0, 1.0)
            }
        }
    });
    return new THREE.Sprite(material);
}

const createSlider = ()=>{
    const slider = document.createElement("input");
    slider.type = "range";
    slider.min = 0;
    slider.max = 1;
    slider.step = 0.0001;
    return slider;
}


const loadImage = (path)=>{
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.src = path;
        img.addEventListener("load",()=>{
            resolve(img);
        });
    });
}

window.addEventListener("load",async()=>{
    main();
});


