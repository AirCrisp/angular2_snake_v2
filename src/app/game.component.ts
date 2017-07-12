import { Component, OnInit, HostListener, ViewChild } from '@angular/core';

import { KEYS } from './app.config';
import { GameService } from './game.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit{
  title = 'Angular2Snake';
  @ViewChild("death") death;
  rows = 20;
  cols = 20;
  matrixBody = Array();
  buttonLayerVisible: boolean = true;
  isPlay: boolean = false;
  isPause: boolean = false;
  isDead: boolean = false;

  constructor(private gameService: GameService){
    this.gameService.snakeDead.subscribe(() => {
          this.isDead = true;
          this.buttonLayerVisible = true;
          this.death.nativeElement.addEventListener('animationend', () => {
            this.isDead = false;
            this.isPlay = false;
          });
    });
  };

  ngOnInit(){
      this.gameService.gameInit(this.rows, this.cols);
      this.isDead = false;
      this.buttonLayerVisible = true;
      this.matrixBody = this.gameService.matrix.body;
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

  isApple(index: number) {
      return this.gameService.isApple(index);
  };

  gameStart(event: any){
    this.gameService.gameInit(this.rows, this.cols);
    event.target.blur();
    this.buttonLayerVisible = false;
    this.isPlay = true;
    this.isPause = false;
    this.isDead = false;
    this.gameService.gameStart();
  };

  gamePause(event:any){
    event.target.blur();
    this.buttonLayerVisible = true;
    this.isPause = true;
    this.gameService.gamePause();
    this.isPause = this.gameService.pause;
  };

  gameResume(event: any) {
    event.target.blur();
    this.buttonLayerVisible = false;
    this.isPause = false;
    this.gameService.gameResume();
  };

}
