import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GamelogicService {
  // constructor som prenumererar på observable och kör funktionen om timerstarted e sant.
  constructor() {
    //interval från rxjs bibliotek. Uppdaterar intervallet slumpmässigt mellan 300ms och 1500ms (1200+300ms). Varje händelse sker alltså mellan 0.3 - 1.5 sekunder.
    interval(Math.floor(Math.random() * 1200 + 300)).subscribe(() => {
      if (this.timerStarted) {
        this.updateRandomCell();
      }
    });
  }

  // variabler som håller en bild, poäng och bildräknare
  image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6OXQPwsFPaDQWc9zR4IbjtiuEd_BeiAanGA&usqp=CAU';
  score = 0;
  imageCounter = 0;

  //metod som uppdaterar slumpmässig ruta i grid med en bild (mole)
  updateRandomCell() {
    if (this.imageCounter >= 3) {
      return;
    }
    //Kod som ger slumpmässig rad, cell, bild. Ger slumpmässigt vald cell den slumpade bilden. Sen ökas imagecounter++ för att visa att ny bild lagts till i griden.
    let rowIndex = Math.floor(Math.random() * 5);
    let cellIndex = Math.floor(Math.random() * 5);
    this.imagePlus(rowIndex, cellIndex);
  }

  //kontrollera om cell är tom - och om så är fallet ge cellen värdet för bild. Alltså ge cellen en "mole"
  imagePlus(rowIndex: number, cellIndex: number) {
    if (this.grid[rowIndex][cellIndex] == '') {
      this.grid[rowIndex][cellIndex] = this.image;
      this.imageCounter++;
      //Intervall som håller koll på om en cell är upptagen. Kallar också på clearCell metod för att rensa cellen om det finns värde i den.
      this.previousGrid[rowIndex][cellIndex] = setInterval(() => {
        this.clearCell(rowIndex, cellIndex);
      }, 4000);
    }
  }

  //rensar värdet i cellen och avslutar intervallet på min sekundära grid efter 2 sekunder.
  clearCell(rowIndex: number, cellIndex: number) {
    this.grid[rowIndex][cellIndex] = '';
    this.imageCounter--;
    clearInterval(this.previousGrid[rowIndex][cellIndex]);
  }
  //klickmetod som rensar cellen om användare klickar på cellen. Avslutar också intervallet från imagePlus vid ett klick och gör alltså cellen fri igen att
  // få ett nytt värde.
  onCellClick(rowIndex: number, cellIndex: number) {
    if (this.grid[rowIndex][cellIndex]) {
      this.grid[rowIndex][cellIndex] = '';
      this.imageCounter--;
      this.score++;
      clearInterval(this.previousGrid[rowIndex][cellIndex]);
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
  //Sekundär grid som håller koll på om det finns ett värde i en cell.
  previousGrid: any[][] = [
    [, , , ,],
    [, , , ,],
    [, , , ,],
    [, , , ,],
    [, , , ,],
  ];

  //attribut för återstående tid - kontroll om tid startat - interval som sparar ID för ett intervall
  remainingTime: number = 60;
  timerStarted: boolean = false;
  intervalId: any;

  //timer som sätter igång tiden - räknar interval och clearar interval efter tid gått ut. kallar på resetcells
  startTimer() {
    this.timerStarted = true;
    this.score = 0; //när timern startar är score 0
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        // när tiden är 0 så clearas interval och återstället tid, och timerstarted till falskt
        clearInterval(this.intervalId);
        this.remainingTime = 60;
        this.timerStarted = false;
        this.clearBoard(); //här kallar vi på metoden clearBoard och vid stoptryckning blir alla celler resettade
      }
    }, 1000);
  }

  //metod för att resetta boarden
  clearBoard() {
    this.grid.forEach((row) => {
      row.fill('');
    });
  }
}
