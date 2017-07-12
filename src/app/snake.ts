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

    checkAlive() {
		if(this.body.length > 3){
			this.alive = !this.body.some(function(currentItem, index: number){
				if(index > 0)
					return (this.body[0][0] == currentItem[0] && this.body[0][1] == currentItem[1])
			}, this);
		}
		if(this.body[0][0] < 0 || this.body[0][1] < 0 || 
			this.body[0][0] > this.maxCols - 1 || this.body[0][1] > this.maxRows - 1)
			this.alive = false;
	};

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
      this.checkAlive();
    };

    eat(){
	    this.body.push(this.lastBody[this.lastBody.length - 1]);
	};

}