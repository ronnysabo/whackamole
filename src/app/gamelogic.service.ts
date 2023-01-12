import { Injectable } from '@angular/core';
import { interval, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamelogicService {
  color = ['purple'];
  constructor() {
    interval(400).subscribe(() => {
      if (this.timerStarted) {
        this.updateRandomCell();
      }
    });
  }

  cells: number = 0;
  score = 0;
  colorCounter = 0;

  updateRandomCell() {
    if (this.colorCounter >= 3) {
      return;
    }

    const rowIndex = Math.floor(Math.random() * 5);
    const cellIndex = Math.floor(Math.random() * 5);
    let colorIndex = Math.floor(Math.random() * this.color.length);
    this.grid[rowIndex][cellIndex] = this.color[colorIndex];
    this.colorCounter++;

    setTimeout(() => {
      this.grid[rowIndex][cellIndex] = '';
      this.colorCounter--;
    }, 3000);
  }

  onCellClick(rowIndex: number, cellIndex: number) {
    if (this.grid[rowIndex][cellIndex] !== '') {
      this.grid[rowIndex][cellIndex] = '';
      this.score++;
    }
  }

  //matris med 25 element som representerar mina rutor på spelplanen
  grid: string[][] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];

  remainingTime: number = 10;
  timerStarted: boolean = false;
  intervalId: any;

  startTimer() {
    this.timerStarted = true;
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.intervalId);
        this.remainingTime = 10;
        this.timerStarted = false;
        this.resetCells();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
    this.timerStarted = false;
    this.remainingTime = 10;
    this.resetCells(); //metoden nedanför kallas på här och vid stoptryckning blir alla celler resettade
  }

  //metod för att resetta alla celler!
  resetCells() {
    this.grid.forEach((row) => {
      row.fill('');
    });
  }
}
