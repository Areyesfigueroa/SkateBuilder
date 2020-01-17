export default function Sketch (p) {
    let canvas;
    let skateModel;
    let skateTexture;
    let skatePos;

    //Zoom Variables
    let zoomPos = 0;
    let zoomSpeed = 0.05;

    /**
     * 1. Set camera 
     */

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
        //Default Values
        skateModel = p.loadModel(require('./../../assets/Skateboard/skateboard.obj'), true);
    }

    p.setup = function () {
        //Default Values
        canvas = p.createCanvas(600, 400, p.WEBGL);
        skateTexture = p.loadImage(require('./../../assets/Skateboard/uv-map.jpg'));
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
        //Init value
        skatePos = newProps.view;
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
            //console.log(p._curElement._curCamera);

        }


        //Initial State 
        //setSkatePosition(newProps.skatePosition, newProps.skatePositions);
        //Redraw when a prop changes.
        // if(canvas) {
        //     //console.log("Props Handler");
        //     //skateTexture = p.loadImage(newProps.skateTexture);
        //     switch(newProps.btnCaller) {
        //         case newProps.buttonIDs.resetCameraBtn:
        //             console.log('Reset Camera!');
        //             p.camera(...newProps.cameraPos);
        //             break;
        //         case newProps.buttonIDs.zoomSlider:
        //             console.log("Zoom Change! " + newProps.zoom);
        //             p.camera(0,0, newProps.zoom, 0,0,0, 0,1,0);
        //             break;
        //         case newProps.buttonIDs.viewPanels:
        //             console.log("Changed View " + newProps.skatePosition);
        //             //setSkatePosition(newProps.skatePosition, newProps.skatePositions); 
        //             console.log('Reset Camera!');
        //             //p.camera(...newProps.cameraPos);                   
        //             break;
        //         default:
        //             console.log("Error, Default State Reached");
        //     }
        // }
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
        //console.log(p._curElement._curCamera.eyeX, p._curElement._curCamera.eyeY);
       // console.log(p._curElement._curCamera);
        //console.log(p._curElement._curCamera._getLocalAxes());
    }

    p.draw = function () {

        p.background(100);
        p.normalMaterial();
        p.orbitControl(3, 3, zoomSpeed);

        //Initial Position
        p.rotateX(toRadians(skatePos.x));
        p.rotateY(toRadians(skatePos.y));
        p.rotateZ(toRadians(skatePos.z));
        
        //Group Translate.
        //p.translate(100, 0, 0);

        //Individual Skate model
        p.push();
        p.texture(skateTexture);
        p.model(skateModel);
        p.pop();
    };
};