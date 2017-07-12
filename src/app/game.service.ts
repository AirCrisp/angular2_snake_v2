import { Injectable } from '@angular/core';
import { KEYS } from './app.config';

@Injectable()
export class GameService {
    matrix: Matrix;
    score = 0;
    snake: Snake;
    intID: number;
    mRows: number;
    mCols: number;
    play: boolean = false;
    pause: boolean = false;
    changeFlag: boolean = true;

    gameInit(mRows: number, mCols: number){
        this.mRows = mRows;
        this.mCols = mCols;
		this.matrix = new Matrix(mRows, mCols);

        this.score = 0;

        this.snake = new Snake(mRows, mCols);
		this.matrix.setCell(this.snake.body[0][0] + (this.snake.body[0][1]*mCols), 'snake');
	};

    gameStart(){
        this.play = true;
        this.pause = false;
        this.intID = setInterval(() => {
			this.move();
		}, 200);
    };

    move(){
        this.snake.move();
        this.changeFlag = true;
        this.matrix.setCell((this.mCols)*this.snake.body[0][0] + this.snake.body[0][1], 'snake');
		this.matrix.setCell((this.mCols)*this.snake.lastBody[this.snake.lastBody.length - 1][0] + this.snake.lastBody[this.snake.lastBody.length - 1][1], 'empty');
    };

    changeCourse(keyCode: number){
        if(this.changeFlag){
			switch(keyCode) {
				case KEYS.LEFT :
					if(this.snake.direction != 'right') this.snake.direction = 'left';
					break;
				case KEYS.UP : 
					if(this.snake.direction != 'down') this.snake.direction = 'up';
					break;
				case KEYS.RIGHT : 
					if(this.snake.direction != 'left') this.snake.direction = 'right';
					break;
				case KEYS.DOWN : 
					if(this.snake.direction != 'up') this.snake.direction = 'down';
					break;			
				};
			this.changeFlag = false;
		};
    };

    gamePause(){
        this.pause = true;
        clearInterval(this.intID)
    };

    gameResume(){
        this.play = true;
        this.pause = false;
        this.intID = setInterval(() => {
			this.move();
		}, 200);
    };

    isSnake(index: number){
        return this.matrix.getCell(index, 'snake');
    };
}

export class Matrix {
	body: string[];

    constructor(private rows: number, private cols: number){
        this.body = new Array();
        for (let i = 0; i< cols*rows; ++i) this.body.push('empty');
    };

    getCell(index: number, type: string){
        return this.body[index] == type;
    };

    setCell(index: number, type: string){
        this.body[index] = type;
    };
}

export class Snake {
    body: number[][];
    lastBody: number[][];
    direction: string;
	alive: boolean;

	constructor(private maxRows: number, private maxCols: number){
		this.body = [[0, 0]];
        this.lastBody = [[0, 0]];
		this.direction = 'right';
		this.alive = true;
	}

    move(){
      this.lastBody = this.body.slice();
      switch(this.direction)
	    {
			case 'right':
				this.body.unshift([this.body[0][0], this.body[0][1] + 1]);
				break;
			case 'left':
				this.body.unshift([this.body[0][0], this.body[0][1] - 1]);
				break;
			case 'up':
				this.body.unshift([this.body[0][0] - 1 , this.body[0][1]]);
				break;
			case 'down':
				this.body.unshift([this.body[0][0] + 1 , this.body[0][1]]);
				break;								
		}
      this.body.pop();
    };

}