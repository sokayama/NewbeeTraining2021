const CANVAS_WIDTH = 628;
const CANVAS_HEIGHT = 837;

const main = async()=>{

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
        const img = colorChanged(sliderR.value,sliderG.value,sliderB.value);
        ctx.putImageData(img, 0,0);
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


    const ctx = canvas.getContext("2d");
    const img = await loadImage("./hamburger.jpg");
    ctx.drawImage(img, 0, 0);
    const originalImage = ctx.getImageData(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // console.log(originalImage.data)


    const colorChanged = (r,g,b)=>{
        const changedImage = ctx.createImageData(CANVAS_WIDTH,CANVAS_HEIGHT);
        for(let i=0;i<CANVAS_WIDTH*CANVAS_HEIGHT*4;i+=4){
            changedImage.data[i+0] = parseInt(originalImage.data[i+0] * r);
            changedImage.data[i+1] = parseInt(originalImage.data[i+1] * g);
            changedImage.data[i+2] = parseInt(originalImage.data[i+2] * b);
            changedImage.data[i+3] = originalImage.data[i+3];
        }
        // console.log(changedImage)
        return changedImage;
    }  
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


