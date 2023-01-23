import { Component } from '@angular/core';
import { GamelogicService } from '../gamelogic.service'; //importerar service

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent {
  grid!: string[][];
  //konstruktor om gör min __gamelogic publik o kan användas utanför klassen - exempelvis i min html template!
  constructor(public _gameLogic: GamelogicService) {
    this.grid = this._gameLogic.grid;
  }
}
