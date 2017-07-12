import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { KEYS } from './app.config';

@Injectable()
export class GameService {
    matrix: Matrix;
    score = 0;
    snake: Snake;
    apple: Apple;
    intID: number;
    mRows: number;
    mCols: number;
    play: boolean = false;
    pause: boolean = false;
    changeFlag: boolean = true;
    scoreChange = new Subject<number>();

    doNextChange(value){
        this.scoreChange.next(value);
    };

    gameInit(mRows: number, mCols: number){
        this.mRows = mRows;
        this.mCols = mCols;
		this.matrix = new Matrix(mRows, mCols);

        this.score = 0;

        this.snake = new Snake(mRows, mCols);
		this.matrix.setCell(this.snake.body[0][1] + (this.snake.body[0][0]*mCols), 'snake');

        this.apple = new Apple(mRows, mCols);
        this.matrix.setCell(this.apple.body[1] + (this.apple.body[0]*mCols), 'apple');
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
        if(this.snake.body[0][0] == this.apple.body[0] &&
			this.snake.body[0][1] == this.apple.body[1]){
				this.snake.eat();
				this.score++;
                this.doNextChange(this.score);
				// if(!(this.score % 5) && (this.score > 0)) this.gameAccelerate();
				do {
				this.apple = new Apple(this.mRows, this.mCols);
				this.matrix.setCell(this.apple.body[1] + (this.apple.body[0]*this.mCols), 'apple');
				}
				while (this.snake.body.some(function(currentEl){
					return (this.apple.body[0] == currentEl[0] && this.apple.body[1] == currentEl[1])}, this));
			};
		// if(!this.snake.alive) this.gameStop();
        console.log(this.apple.body[0], this.apple.body[1]);
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

    isApple(index: number){
        return this.matrix.getCell(index, 'apple');
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

    eat(){
	    this.body.push(this.lastBody[this.lastBody.length - 1]);
	};

}

export class Apple {
    body: number[];

	constructor(private mRows: number, private mCols: number){
		this.body = [Math.round(Math.random()*mRows), Math.round(Math.random()*mCols)];
	}
}