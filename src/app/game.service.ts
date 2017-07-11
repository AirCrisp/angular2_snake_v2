import { Injectable } from '@angular/core';

@Injectable()
export class GameService {
    matrix: Matrix;
    score = 0;

    gameInit(mRows: number, mCols: number){
		this.matrix = {
			rows: mRows,
			cols: mCols,
			body: ['empty']
		};
		for (let i = 1; i< mCols*mRows; ++i) this.matrix.body.push('empty');
	};
}

export class Matrix {
    rows: number;
	cols: number;
	body: string[];
}