import { Component } from '@angular/core';
import { GameService } from './game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular2Snake';
  score: number;

  constructor(private gameService: GameService){
    this.gameService.scoreChange.subscribe(() => {
          this.score = this.gameService.score;
    });
  };
}
