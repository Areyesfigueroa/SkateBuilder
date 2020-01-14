export default function Sketch (p) {
    let canvas;
    let texture;
    let skateModel;
    let color;

    let skatePos;

    const setSkatePosition = (pos, skatePoses) => {
    
        const modelPos = {
            dynamic: {x:-60, y:-10, z:15},
            front: {x:-90,y:0,z:0},
            side: {x:-90,y:0,z:90},
            top: {x:0,y:180,z:0},
            bottom: {x:0,y:0,z:0}
        };

        switch(pos) {
            case skatePoses.DYNAMIC:
                skatePos = {...modelPos.dynamic};
                break;
            case skatePoses.FRONT:
                skatePos = {...modelPos.front};
                break;
            case skatePoses.SIDE:
                skatePos = {...modelPos.side};
                break;
            case skatePoses.TOP:
                skatePos = {...modelPos.top};
                break;
            case skatePoses.BOTTOM:
                skatePos = {...modelPos.bottom};
                break;
            default:
                console.log('No Position Chosen');
        }

        return skatePos;
    }

    const toRadians = function (x) {
        return x * Math.PI/180;
    }

    p.preload = function () {
        skateModel = p.loadModel(require('./../../assets/Skateboard/skateboard.obj'), true);
    }

    p.setup = function () {
        canvas = p.createCanvas(600, 400, p.WEBGL);
        color = [255, 255, 255]; //default
        texture = p.loadImage(require('./../../assets/Skateboard/uv-map.jpg'));
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
        
        //Initial State 
        setSkatePosition(newProps.skatePosition, newProps.skatePositions);
        //Redraw when a prop changes.
        if(canvas){

            switch(newProps.btnCaller){
                case newProps.buttonIDs.changeColorBtn:
                    console.log('Color Change!');
                    color = newProps.color;
                    break;
                case newProps.buttonIDs.resetCameraBtn:
                    console.log('Reset Camera!');
                    p.camera(...newProps.cameraPos);
                    break;
                case newProps.buttonIDs.changeDeckTextureBtn:
                    console.log("Texture Change!");
                    texture = p.loadImage(newProps.deckTexture);
                    break;
                case newProps.buttonIDs.zoomSlider:
                    console.log("Zoom Change! " + newProps.zoom);
                    p.camera(0,0, newProps.zoom, 0,0,0, 0,1,0);
                    break;
                case newProps.buttonIDs.viewPanels:
                    console.log("Changed View " + newProps.skatePosition);
                    setSkatePosition(newProps.skatePosition, newProps.skatePositions); 
                    console.log('Reset Camera!');
                    p.camera(...newProps.cameraPos);                   
                    break;
                default:
                    console.log("Error, Default State Reached");
            }

        }

    };

    p.draw = function () {

        p.background(100);
        p.normalMaterial();
        p.orbitControl(3, 3, 0.03);

        //Initial Position
        p.rotateX(toRadians(skatePos.x));
        p.rotateY(toRadians(skatePos.y));
        p.rotateZ(toRadians(skatePos.z));
        
        //Group Translate.
        //p.translate(100, 0, 0);

        //Individual Skate model
        p.push();
        p.texture(texture);
        p.model(skateModel);
        p.pop();

        //Individual Box1
        p.push();
        p.translate(10, 10, 0);
        p.box(100, 100, 100);
        p.pop();

    };
};