import cell from "../cell/cell";

export interface PreyData {
    placement: cell,
    color: string
}

const PREY_COLOR = 'red';

export const generatePrey = (widthMax: number, heightMax: number) => {
    
    let x = Math.floor(Math.random() * (widthMax - 20));
    x = x - (x % 20);


    let y = Math.floor(Math.random() * (heightMax - 20));
    y = y - (y % 20);

    const placement: cell = {x: x, y: y};

    return {placement, color: PREY_COLOR} as PreyData;
}

export const drawPrey = (preyData: PreyData, canvasContext: CanvasRenderingContext2D | null) => {
    const {placement, color } = preyData;
    //console.log('drawSnake Pices => ' + JSON.stringify(pieces));
    if (!canvasContext) return null;

    canvasContext.fillStyle = color;
    canvasContext.strokeStyle = '#000000';
    canvasContext.strokeRect(placement.x, placement.y, 20, 20);
    canvasContext.fillRect(placement.x, placement.y, 20, 20);

    //return canvasContext;
    
}