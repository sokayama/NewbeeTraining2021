export class ThreeWrapper{
    constructor(){
    }

    async shaderLoad(){
        const UV_COLOR = "./js/uvColor";
        const TEXTURE = "./js/texture";
        const GAMING = "./js/gaming";

        const path = UV_COLOR;
        const res_frag = await fetch(path + ".frag");
        this.frag = await res_frag.text();

        const res_vert = await fetch(path + ".vert");
        this.vert = await res_vert.text();

        var loader = new THREE.TextureLoader();

        this.texture = await loader.load("./js/img.png");
    }

    createDirectionalLight(){
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        return light;
    }

    createPlaneGeometory(){
        const width = 1;
        const height = 1;
        return new THREE.PlaneGeometry(width, height);
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

    createShaderMaterial(){
        // console.log(this.vert)
        // console.log(this.frag)
        return new THREE.ShaderMaterial({
            uniforms:{
                time: {value: 0.0},
                uTex: {value: this.texture}
            },
            vertexShader:this.vert,
            fragmentShader:this.frag
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