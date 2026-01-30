import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-reazione-a-catena',
  standalone: true,
  imports: [TimerComponent, CommonModule],
  templateUrl: './reazione-a-catena.component.html',
  styleUrl: './reazione-a-catena.component.scss'
})
export class ReazioneACatenaComponent extends HandlerBase implements OnInit {

  index = 0;
  points = 0;
  words: string[] = [];

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta le parole del gioco.
   */
  private setNames() {

    const charsString = prompt("Inserisci le parole.", "Genesi Salomone Apostolo Arca Patto");

    if (!charsString || charsString === "") {
      this.closeGame("Per poter giocare assicurati di aggiungere delle parole.");
    }

    else this.words = charsString.split(" ").map(c => c.toUpperCase());
  }

  /**
   * Fa ripartire il timer.
   */
  private startTimer() {

    this.payload.stopTimer$.next();

    this.timerRxJS(0, () => this.payload.startTimer$.next());
  }

  /**
   * Aggiorna il punteggio: se result è true aggiunge un punto, altrimenti lo toglie.
   */
  setPoints(result?: boolean, playSound?: boolean, isClick = false) {

    if (isClick) {

      if (this.index !== this.words.length - 1) {

        this.payload.stopTimer$.next();
        this.index++;
      }
    }

    else {

      if (result) this.points++;

      else {

        if (this.points > 0) this.points--;
      }

      this.payload.stopTimer$.next();

      if (playSound) this.play(result ? "success" : "error");
    }
  }

  override reazioneACatenaHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Va avanti
      if (this.code === "ArrowRight") {

        if (this.index !== this.words.length - 1) {

          this.index++;
          this.startTimer();
        }
      }

      // Va indietro
      if (this.code === "ArrowLeft") {

        if (this.index > 0) {

          this.index--;
          this.startTimer();
        }
      }

      // Risposta esatta
      if (this.code === "Enter") this.setPoints(true, !this.shiftKey);

      // Risposta sbagliata
      if (this.code === "Backspace") this.setPoints(false, !this.shiftKey);
    }
  }
}
