import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamelogicService {
  constructor() {
    interval(100).subscribe(() => {
      if (this.timerStarted) {
        this.updateRandomCell();
      }
    });
  }

  image = ['mole.jpg'];
  score = 0;
  imageCounter = 0;

  updateRandomCell() {
    if (this.imageCounter >= 3) {
      return;
    }

    const rowIndex = Math.floor(Math.random() * 5);
    const cellIndex = Math.floor(Math.random() * 5);
    let imageIndex = Math.floor(Math.random() * this.image.length);
    this.grid[rowIndex][cellIndex] = this.image[imageIndex];
    this.imageCounter++;

    setTimeout(() => {
      this.grid[rowIndex][cellIndex] = '';
      this.imageCounter--;
    }, 1000);
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

  remainingTime: number = 60;
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
