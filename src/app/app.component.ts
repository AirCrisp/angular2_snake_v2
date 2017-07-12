import { Component } from '@angular/core';
import { GameService } from './game.service';
import { BOARD_SIZE } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular2Snake';
  score: number = 0;
  rows = BOARD_SIZE.ROWS;
  cols = BOARD_SIZE.COLS;

  constructor(private gameService: GameService){
    this.gameService.scoreChange.subscribe(() => {
          this.score = this.gameService.score;
    });
  };
}
