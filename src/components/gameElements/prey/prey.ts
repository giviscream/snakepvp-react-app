import cell from "../cell/cell";

export interface PreyData {
    placement: cell,
    color: string
}

const PREY_COLOR = 'red';

export const generatePreys = (widthMax: number, heightMax: number, count: number = 1) => {
    
    let preys: PreyData[] = []
    let counter = 0;
    do {
        let x = Math.floor(Math.random() * (widthMax - 20));
        x = x - (x % 20);


        let y = Math.floor(Math.random() * (heightMax - 20));
        y = y - (y % 20);

        const placement: cell = {x: x, y: y};
        preys.push( {placement, color: PREY_COLOR});

    } while (count > ++counter);

    return preys;
}

export const drawPreys = (preyData: Array<PreyData>, canvasContext: CanvasRenderingContext2D | null) => {

    //console.log('drawSnake Pices => ' + JSON.stringify(pieces));
    if (!canvasContext) return null;

    preyData?.forEach(pD => {
        canvasContext.fillStyle = pD.color;
        canvasContext.strokeStyle = '#000000';
        canvasContext.strokeRect(pD.placement.x, pD.placement.y, 20, 20);
        canvasContext.fillRect(pD.placement.x, pD.placement.y, 20, 20);
    })

    //return canvasContext;
    
}