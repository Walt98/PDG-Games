import { Component, HostListener } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import data from '../../../public/game3items.json';
import { PayloadService } from '../payload.service';
import { play } from '../common-functions';
import { CommonModule } from '@angular/common';

declare type CompletaIlVersoItem = { verso: string; risposte: string[]; };

@Component({
  selector: 'app-completa-il-verso',
  standalone: true,
  imports: [TimerComponent, CommonModule],
  templateUrl: './completa-il-verso.component.html',
  styleUrl: './completa-il-verso.component.scss'
})
export class CompletaIlVersoComponent {

  index = 0;
  showTimer = true;
  showAnswer = false;
  items = JSON.parse(JSON.stringify(data)) as CompletaIlVersoItem[];

  constructor(public payload: PayloadService) { }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index < this.items.length - 1 && (this.showAnswer || event.shiftKey)) {
        this.showAnswer = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index++;
      }
    }

    // Va indietro
    if (event.code === "ArrowLeft") {

      if (this.index > 0 && (this.showAnswer || event.shiftKey)) {
        this.showAnswer = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index--;
      }
    }

    // Risposta esatta
    if (event.code === "Enter") this.show();

    // Risposta sbagliata
    if (["Delete", "Backspace"].includes(event.code)) {

      this.payload.stopTimer$.next();
      play("error");
      this.showAnswer = true;
    }
  }

  /**
   * Mostra la parola corretta.
   */
  show(isClick = false) {

    if (this.showAnswer && isClick) {

      if (this.index !== this.items.length - 1) {

        this.showAnswer = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index++;
      }
    }

    else {

      this.showAnswer = true;
      this.payload.stopTimer$.next();
      play("success");
    }
  }

  /**
   * Evento timeout del timer.
   */
  onTimeout() {

    setTimeout(() => this.showAnswer = true, 3000);
  }
}
