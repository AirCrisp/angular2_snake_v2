import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import { KEYS } from './app.config';
import {Apple} from './apple';
import {Snake} from './snake';
import {Matrix} from './matrix';

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
    snakeDead = new Subject<Snake>();

    doNextChange(value){
        this.scoreChange.next(value);
    };

    doNextDeath(value){
        this.snakeDead.next(value);
    };

    gameInit(mRows: number, mCols: number){
        this.mRows = mRows;
        this.mCols = mCols;
		this.matrix = new Matrix(mRows, mCols);

        this.score = 0;
        this.doNextChange(this.score);

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

    gameAccelerate(){
		clearInterval(this.intID);
		this.intID = setInterval(() => {
			this.move()
		}, 200 - this.score*3);
	};

    move(){
        this.snake.move();
        this.changeFlag = true;
        if(this.snake.body[0][0] == this.apple.body[0] &&
			this.snake.body[0][1] == this.apple.body[1]){
				this.snake.eat();
				this.score++;
                this.doNextChange(this.score);
				if(!(this.score % 5) && (this.score > 0)) this.gameAccelerate();
				do {
				this.apple = new Apple(this.mRows, this.mCols);
				}
				while (this.snake.body.some(function(currentEl){
					return (this.apple.body[0] == currentEl[0] && this.apple.body[1] == currentEl[1])}, this));
                this.matrix.setCell(this.apple.body[1] + (this.apple.body[0]*this.mCols), 'apple');
			};
		if(!this.snake.alive) this.gameStop()
        else {
            this.matrix.setCell((this.mCols)*this.snake.body[0][0] + this.snake.body[0][1], 'snake');
            this.matrix.setCell((this.mCols)*this.snake.lastBody[this.snake.lastBody.length - 1][0] + this.snake.lastBody[this.snake.lastBody.length - 1][1], 'empty');
        };
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

    gameStop(){
        this.play = false;
		clearInterval(this.intID);
        this.doNextDeath(this.snake);
    };

    isSnake(index: number){
        return this.matrix.getCell(index, 'snake');
    };

    isApple(index: number){
        return this.matrix.getCell(index, 'apple');
    };
}