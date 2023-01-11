import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GamelogicService {
  constructor() {}

  //matris med 25 element som representerar mina rutor på spelplanen
  grid: number[][] = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];

  remainingTime = 60;
  timer: any;
  startTimer() {
    this.timer = setInterval(() => {
      this.remainingTime--;
      console.log(`Time remaining: ${this.remainingTime}`);
    }, 1000);
  }
  stopTimer() {
    clearInterval(this.timer);
  }
}
