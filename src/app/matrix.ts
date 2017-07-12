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