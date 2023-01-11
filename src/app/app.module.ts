import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { GamelogicService } from './gamelogic.service';

@NgModule({
  declarations: [AppComponent, GameboardComponent],
  imports: [BrowserModule],
  providers: [GamelogicService],
  bootstrap: [AppComponent],
})
export class AppModule {}
