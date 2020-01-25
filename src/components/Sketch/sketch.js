import './sketch.css';
export default function Sketch (p) {
    let canvas;
    let skatePos;

    //Skate Obj Variables
    let deckBottomObj, deckMiddleObj, deckTopObj, truckObj, wheelObj;
    let deckBottomTexture, deckMiddleTexture, deckTopTexture, truckTexture, wheelTexture;

    //Zoom Variables
    let zoomPos = 0;
    let zoomSpeed = 0.05;

    const toRadians = function (x) {
        return x * Math.PI/180;
    }

    p.preload = function () {
        //Skate Obj Models
        deckBottomObj = p.loadModel(require('./../../assets/SkateboardObjs/DECK_BOTTOM.obj'), true);
        deckMiddleObj = p.loadModel(require('./../../assets/SkateboardObjs/DECK_MIDDLE.obj'), true);
        deckTopObj = p.loadModel(require('./../../assets/SkateboardObjs/DECK_TOP.obj'), true);
        truckObj = p.loadModel(require('./../../assets/SkateboardObjs/TRUCK.obj'), true);
        wheelObj = p.loadModel(require('./../../assets/SkateboardObjs/WHEEL.obj'), true);

    }

    p.setup = function () {
        //Default Values
        canvas = p.createCanvas(900, 400, p.WEBGL);
        canvas.elt.parentElement.classList.add('sketch');
        canvas.elt.style.cssText=`visibility: hidden; width: 100%; height: 400px;`;
        
        //Camera Default
        p.camera(0, 0, zoomPos, 0, 0, 0, 0, 1, 0);

        //Skate Textures
        deckBottomTexture = p.loadImage(require('./../../assets/SkateboardTextures/deck_bottom_003.jpg'));
        deckMiddleTexture = p.loadImage(require('./../../assets/SkateboardTextures/deck_middle_001.jpg'));
        deckTopTexture = p.loadImage(require('./../../assets/SkateboardTextures/deck_top_002.jpg'));
        truckTexture = p.loadImage(require('./../../assets/SkateboardTextures/trucks_004.jpg'));
        wheelTexture = p.loadImage(require('./../../assets/SkateboardTextures/wheels_002.jpg'));
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
        //Init value
        skatePos = newProps.view;
        zoomPos = newProps.zoom;
        if(canvas) {
            skatePos = newProps.view;    
            p.camera(
                0,
                0,
                newProps.zoom,

                newProps.cameraCoord[3],
                newProps.cameraCoord[4],
                newProps.cameraCoord[5],

                newProps.cameraCoord[6],
                newProps.cameraCoord[7],
                newProps.cameraCoord[8]
                );

            deckBottomTexture = p.loadImage(require(`./../../assets/SkateboardTextures/${newProps.deckBottom}.jpg`));
            deckTopTexture = p.loadImage(require(`./../../assets/SkateboardTextures/${newProps.deckTop}.jpg`));
            deckMiddleTexture = p.loadImage(require(`./../../assets/SkateboardTextures/${newProps.deckMiddle}.jpg`));
            truckTexture = p.loadImage(require(`./../../assets/SkateboardTextures/${newProps.trucks}.jpg`));
            wheelTexture = p.loadImage(require(`./../../assets/SkateboardTextures/${newProps.wheels}.jpg`));
        }
    };

    p.mouseWheel = function (event) {

        const maxZoom = 160;
        const minZoom = 600;
        const zSpeed = 0.05;

        zoomPos = -p._curElement._curCamera.cameraMatrix.mat4[14]; //invert
        if(zoomPos < maxZoom) {
            console.log('too close!, stop moving.');
            zoomSpeed = 0;
            zoomPos = 150;
            if(event.delta > 0) {
                zoomPos += event.delta;
                zoomSpeed = zSpeed;
            }
        } else if(zoomPos > minZoom) {
            console.log('too far!, stop moving.');
            zoomSpeed = 0;
            zoomPos = 500;
            if(event.delta < 0) {
                zoomPos -= event.delta;
                zoomSpeed = zSpeed;
            }
        } else {
            zoomSpeed = zSpeed;
        }
    }

    p.draw = function () {

        p.background(100);
        p.normalMaterial();
        p.orbitControl(3, 3, zoomSpeed);

        //Group Rotate
        p.rotateX(toRadians(skatePos.x));
        p.rotateY(toRadians(skatePos.y));
        p.rotateZ(toRadians(skatePos.z));
        
        //Group Translate.
        p.translate(0, 0, 0);

        //Group Texture
        //p.texture(skateTexture);

        //Deck Bottom Model
        p.push();
        p.texture(deckBottomTexture);
        p.model(deckBottomObj);
        p.pop();

        //Deck Middle
        p.push();
        p.texture(deckMiddleTexture);
        p.model(deckMiddleObj);
        p.pop();

        //Deck Top
        p.push();
        p.translate(0, 0, 1);
        p.texture(deckTopTexture);
        p.model(deckTopObj);
        p.pop();

        //Trucks
        p.push();
        p.translate(0,0,-13);
        p.scale(0.8);
        p.texture(truckTexture);
        p.model(truckObj);
        p.pop();

        //Wheels
        p.push();
        p.translate(0,0,-18);
        p.scale(0.77 );
        p.texture(wheelTexture);
        p.model(wheelObj);
        p.pop();
    };
};