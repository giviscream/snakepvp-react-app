import { useEffect, useRef, useState } from "react";
import { drawPrey, generatePrey, PreyData } from "../prey/prey";
import { Direction, drawSnake, initialSnakeData, shiftSnake, SnakeData } from "../snake/snake";

interface Props{
    width: number,
    height: number
}

let GLOBAL_I = 0;

export default function Board({width, height}: Props){
   
    const gameBoardRef = useRef<HTMLCanvasElement | null>(null);//React.createRef<HTMLCanvasElement>();
    const [gameBoardContext, setGameBoardContext] = useState<CanvasRenderingContext2D | null>(null);
    const [snakeData, setSnakeData] = useState<SnakeData>(initialSnakeData);
    const [prey, setPrey] = useState<Array<PreyData>>([generatePrey(width, height)]);

    const handleSnakeAtePrey = (snake: SnakeData) => {

        setPrey((prev) => {
                const head = {...snake.pieces[0]};
                
                return prev.filter(p => !(p.placement.x === head.x && p.placement.y === head.y))
                    .concat([generatePrey(width, height)])
        });
    };

    const updateSnakeIfDead = (snake: SnakeData) => {
        const {direction, pieces} = snake;
        const head = pieces[0];

        const isSnakeOutOfBounds = (head.x > width - 20 && direction === Direction.Right)
                                    || (head.x < 0 && direction === Direction.Left)
                                    || (head.y > height - 20 && direction === Direction.Down)
                                    || (head.y < 0 && direction === Direction.Up);

        if (isSnakeOutOfBounds)
        {
            setSnakeData((prev) => {
                return {
                    ...prev,
                    isAlive: false
                };
            });
        }

    }

    //let snakeData: SnakeData = initialSnakeData;
    //console.log('#BREAK# => ' + JSON.stringify(snakeData));
    useEffect(() => {

        setGameBoardContext(gameBoardRef.current && gameBoardRef.current.getContext("2d"));
        
        const handleChangeDirection = (direction: Direction) => {   
            setSnakeData((prev) => {
                //console.log("handleChangeDirection: " + JSON.stringify(prev) + " -> " + direction);
    
                const isReverseDirection = (prev.direction === Direction.Up && direction === Direction.Down)
                    || (prev.direction === Direction.Down && direction === Direction.Up)
                    || (prev.direction === Direction.Left && direction === Direction.Right)
                    || (prev.direction === Direction.Right && direction === Direction.Left)
    
                if (isReverseDirection) 
                    return prev;
    
                return {
                    ...prev, 
                    direction: direction
                }
            });
    
        };

        const keyPressedHandler = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowLeft':
                    handleChangeDirection(Direction.Left);
                    break;
                case 'ArrowUp':
                    handleChangeDirection(Direction.Up);
                    break;
                case 'ArrowRight':
                    handleChangeDirection(Direction.Right);
                    break;
                case 'ArrowDown':
                    handleChangeDirection(Direction.Down);
                    break;
            }
        }
        //console.log("mount listner: keydown");
        window.addEventListener('keydown', keyPressedHandler);

        return () => {
            //console.log("unmount listner: keydown");
            window.removeEventListener('keydown', keyPressedHandler);
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            
            const newSnake = shiftSnake(snakeData, prey[0]);
            
            //console.log(JSON.stringify(prey[0]));
            setSnakeData(newSnake);
            handleSnakeAtePrey(newSnake);
            updateSnakeIfDead(newSnake);

        }, 100 * 5);
        //to do: разобраться, как это работает????
        //console.log("What?");
        if (snakeData.isAlive) {
            gameBoardContext?.clearRect(0, 0, width, height);

            if (prey.length > 0)
                drawPrey(prey[0], gameBoardContext);

            console.log(JSON.stringify(snakeData.pieces[0]));
            drawSnake(snakeData, gameBoardContext);
        }
        
        

        return () => {
            //console.log('unmount interval');
            clearInterval(interval);
        };
        
    }, [gameBoardContext, snakeData, prey]);

    return (
        
        <canvas 
            id='gameBoard'
            ref={gameBoardRef} 
            width={width}
            height={height}
            style={{
                border:'1px solid #000000'
            }}
        >
        </canvas>
    )
}