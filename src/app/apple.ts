export class Apple {
    body: number[];

	constructor(private mRows: number, private mCols: number){
		this.body = [Math.round(Math.random()*(mRows-1)), Math.round(Math.random()*(mCols-1))];
	}
}