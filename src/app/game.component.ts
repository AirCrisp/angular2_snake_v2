import { Component, OnInit, HostListener } from '@angular/core';

import { KEYS } from './app.config';
import { GameService } from './game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  title = 'Angular2Snake';
  rows = 20;
  cols = 20;
  matrixBody = Array();
  buttonVisible: boolean = true;
  isPause: boolean;

  constructor(private gameService: GameService){};

  ngOnInit(){
      this.gameService.gameInit(this.rows, this.cols);
      this.matrixBody = this.gameService.matrix.body;
      this.isPause = this.gameService.pause;
  };

  @HostListener('window:keydown', ['$event']) keyboardInput(event: KeyboardEvent) {
	if(this.gameService.play) {
		this.gameService.changeCourse(event.keyCode);
		if(event.keyCode == KEYS.SPACE_BAR) {
			this.gamePause(event);
		}
	}
  }

  isSnake(index: number){
      return this.gameService.isSnake(index);
  };

  gameStart(event: any){
    this.gameService.gameInit(this.rows, this.cols);
    event.target.blur();
    this.buttonVisible = false;
    this.gameService.gameStart();
  };

  gamePause(event:any){
    event.target.blur();
    this.buttonVisible = true;
    this.gameService.gamePause();
    this.isPause = this.gameService.pause;
  };

  gameResume(event: any) {
    event.target.blur();
    this.buttonVisible = false;
    this.gameService.gameResume();
  };

}
