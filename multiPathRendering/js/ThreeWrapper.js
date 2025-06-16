export class ThreeWrapper{
    constructor(){
    }

    createDirectionalLight(){
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        return light;
    }

    createCubeGeometory(){
        const boxWidth = 1;
        const boxHeight = 1;
        const boxDepth = 1;
        return new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    }

    createSphereGeometry(){
        const radius = 1;
        const widthSegments = 32;
        const heightSegments = 32;
        return new THREE.SphereGeometry(radius,widthSegments,heightSegments);
    }

    createTorusGeometry(){
        const radius = 0.7;
        const tube = 0.2;
        const radialSegments = 16;
        const tubularSegments = 18;
        return new THREE.TorusGeometry( radius, tube, radialSegments, tubularSegments);
    }

    createPhongMaterial(){
        return new THREE.MeshPhongMaterial({
            color: this._randomColor(),
        });
    }

    async createBasePassMaterial(colorVec3){
        const res_frag = await fetch("./js/shading.frag");
        const frag = await res_frag.text();
    
        const res_vert = await fetch("./js/shading.vert");
        const vert = await res_vert.text();
    
        return new THREE.ShaderMaterial({
            uniforms:{
                color: {value: new THREE.Vector4(colorVec3.x, colorVec3.y, colorVec3.z, 1.0) },
                lightDirection: {value: new THREE.Vector3(-0.5, 0.5, 0.5)},
                ambientLight: { value: new THREE.Vector3(0.1, 0.1, 0.1) },
                shininess:     { value: 16.0 }, // スペキュラ強度
                specularColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) }
            },
            vertexShader:vert,
            fragmentShader:frag
        });
    }

    async createGrayScaleMaterial(){
        const res_gray_frag = await fetch("./js/grayscale.frag");
        const grayFrag = await res_gray_frag.text();

        const res_gray_vert = await fetch("./js/grayscale.vert");
        const grayVert = await res_gray_vert.text();

        return new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: {value: null}
            },
            vertexShader: grayVert,
            fragmentShader: grayFrag
        });
    }
    
    async createSobelMaterial(){
        const res_frag = await fetch("./js/sobel.frag");
        const frag = await res_frag.text();

        const res_vert = await fetch("./js/sobel.vert");
        const vert = await res_vert.text();

        return new THREE.ShaderMaterial({
            uniforms: {
                tDiffuse: {value: null},
                texelSize: { value: new THREE.Vector2(1 / window.innerWidth, 1 / window.innerHeight) }
            },
            vertexShader: vert,
            fragmentShader: frag
        });
    }

    createMesh(geometry,material){
        const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.set(this._rand(-20, 20), this._rand(-20, 20), this._rand(-20, 20));
        // mesh.rotation.set(this._rand(Math.PI), this._rand(Math.PI), 0);
        // mesh.scale.set(this._rand(3, 6), this._rand(3, 6), this._rand(3, 6));
        return mesh;
    }

    _rand(min, max){
        if (max === undefined) {
        max = min;
        min = 0;
        }
        return min + (max - min) * Math.random();
    }

    _randomColor(){
        return `hsl(${this._rand(360) | 0}, ${this._rand(50, 100) | 0}%, 50%)`;
    }
}