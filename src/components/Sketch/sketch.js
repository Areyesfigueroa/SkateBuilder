import './sketch.css';
export default function Sketch (p) {
    let canvas;
    let skatePos;

    //Skate Obj Variables
    let deckBottomObj, deckMiddleObj, deckTopObj, truckObj, wheelObj;

    //Zoom Variables
    let zoomPos = 0;
    let zoomSpeed = 0.05;

    //Button Controllers
    let dimension;

    //Prev Props
    const prevTextureProps = {
        'deck_bottom': '',
        'deck_top': '',
        'deck_middle': '',
        'trucks': '',
        'wheels': ''
    };
    const boardTextures = {...prevTextureProps};

    const toRadians = function (x) {
        return x * Math.PI/180;
    }

    const renderBoardTextures = (newProps) => {
        setBoardTexture('deck_bottom', newProps.deckBottom);
        setBoardTexture('deck_top', newProps.deckTop);
        setBoardTexture('deck_middle', newProps.deckMiddle);
        setBoardTexture('trucks', newProps.trucks);
        setBoardTexture('wheels', newProps.wheels);
    }

    const setBoardTexture = (key, newTexture) => {
        if(prevTextureProps[key] !== newTexture) {
            console.log(`Render new ${key}`);
            prevTextureProps[key] = newTexture; //set prev props
            boardTextures[key] = p.loadImage(require(`./../../assets/SkateboardTextures/${newTexture}.jpg`));
        }
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
        canvas.elt.style.cssText=`visibility: hidden; width: 100%; height: 100%;`;
        
        //Camera Default
        p.camera(0, 0, zoomPos, 0, 0, 0, 0, 1, 0);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
        
        //Init value
        skatePos = newProps.view;
        zoomPos = newProps.zoom;
        dimension = newProps.dimension;

        renderBoardTextures(newProps);

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

        if(dimension === '3D') {
            p.orbitControl(3, 3, zoomSpeed);
        }

        //Group Rotate
        p.rotateX(toRadians(skatePos.x));
        p.rotateY(toRadians(skatePos.y));
        p.rotateZ(toRadians(skatePos.z));

        //Deck Bottom Model
        p.push();
        p.texture(boardTextures['deck_bottom']);
        p.model(deckBottomObj);
        p.pop();

        //Deck Middle
        p.push();
        p.texture(boardTextures['deck_middle']);
        p.model(deckMiddleObj);
        p.pop();

        //Deck Top
        p.push();
        p.translate(0, 0, 1);
        p.texture(boardTextures['deck_top']);
        p.model(deckTopObj);
        p.pop();

        //Trucks
        p.push();
        p.translate(0,0,-13);
        p.scale(0.8);
        p.texture(boardTextures['trucks']);
        p.model(truckObj);
        p.pop();

        //Wheels
        p.push();
        p.translate(0,0,-18);
        p.scale(0.77 );
        p.texture(boardTextures['wheels']);
        p.model(wheelObj);
        p.pop();
    };
};