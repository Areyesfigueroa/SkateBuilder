export default function sketch (p) {
    let canvas;

    //Prop variables
    let color;

    p.setup = function () {
        canvas = p.createCanvas(600, 400, p.WEBGL);
        color = [255, 255, 255]; //default
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (newProps) {
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
                default:
                    console.log("Error, Default State Reached");
            }
        }

    };

    p.draw = function () {

        p.orbitControl(1, 1);
        p.background(100);
        p.normalMaterial();
        p.noStroke();
        p.push();
        p.fill(color);
        p.box(100);
        p.pop();
    };
};