import { Component, OnInit } from '@angular/core';

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

  constructor(private gameService: GameService){};

  ngOnInit(){
      this.gameService.gameInit(this.rows, this.cols);
      this.matrixBody = this.gameService.matrix.body;
  };

}
