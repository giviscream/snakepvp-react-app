import {useEffect, useState } from "react";
import cell from "../cell/cell";
import { PreyData } from "../prey/prey";

export const enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}

export interface SnakeData {
    //canvasContext: CanvasRenderingContext2D | null,
    pieces: Array<cell>,
    color: string,
    direction: Direction,
    isAlive: Boolean
}

const DEFAULT_CELLS: Array<cell> = [
    {x: 580, y: 300},
    {x: 560, y: 300},
    {x: 540, y: 300},
    {x: 520, y: 300},
    {x: 500, y: 300}
];

export const initialSnakeData = {pieces: DEFAULT_CELLS, color: '#009900aa', direction: Direction.Right, isAlive: true};

const getShiftedHead = (direction: Direction, pieces: Array<cell>) => {
    let head = {...pieces[0]};
    //console.log('Head prev DIR => ' + direction);
    switch (direction) {      
        case Direction.Up:
            head = {...head, y: head.y - 20};
            break;
        case Direction.Down:
            head = {...head, y: head.y + 20};
            break;
        case Direction.Left:
            head = {...head, x: head.x - 20};
            break;
        case Direction.Right:
            head = {...head, x: head.x + 20};
            break;
    }

    return head;
}

export const shiftSnake = (snakeData: SnakeData, preys: Array<PreyData>) => {

    const {pieces, direction, isAlive} = snakeData;

    if (!isAlive) return snakeData;

    let newPieces: Array<cell> = [];
    const head = getShiftedHead(direction, pieces);

    newPieces.push(head);

    const isSnakeAtePrey = preys.some(p => {
        return head.x === p.placement.x && head.y === p.placement.y
    })

    if (isSnakeAtePrey)
    {
        newPieces = newPieces.concat(pieces);
    }
    else
    {
        newPieces = newPieces.concat(pieces.slice(0, -1));
    }
    //console.log('Head Curr => ' + JSON.stringify(head));
    //console.log('Shift direction => ' + direction.toString());
    //console.log('Pices => ' + JSON.stringify({...snakeData, pieces: newPieces}));
    return {...snakeData, pieces: newPieces};
    //return newPieces;
};
//to do: Избавиться от мутации
export const drawSnake = (snakeData: SnakeData, canvasContext: CanvasRenderingContext2D | null) => {
    const {pieces, color } = snakeData;
    //console.log('drawSnake Pices => ' + JSON.stringify(pieces));
    if (!canvasContext) return null;

    //const newCanvasContext = {...canvasContext};
    //console.log('drawSnake Pices => ' + JSON.stringify(pieces));
    //console.log('drawSnake CanvasContext => ' + JSON.stringify(canvasContext));
    /*
    pieces.forEach(c => {
        newCanvasContext.fillStyle = color;
        newCanvasContext.strokeStyle = '#000000';
        newCanvasContext?.strokeRect(c.x, c.y, 20, 20);
        newCanvasContext?.fillRect(c.x, c.y, 20, 20);
    });
    
    return newCanvasContext;
    */
    pieces.forEach(c => {
        canvasContext.fillStyle = color;
        canvasContext.strokeStyle = '#000000';
        canvasContext.strokeRect(c.x, c.y, 20, 20);
        canvasContext.fillRect(c.x, c.y, 20, 20);
    });

    //console.log('Context => ' + JSON.stringify(canvasContext.canvas.getBoundingClientRect()));
    //return canvasContext;
    
}