import { Component, HostListener, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';
import { TimerComponent } from '../timer/timer.component';
import { play } from '../common-functions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reazione-a-catena',
  standalone: true,
  imports: [TimerComponent, CommonModule],
  templateUrl: './reazione-a-catena.component.html',
  styleUrl: './reazione-a-catena.component.scss'
})
export class ReazioneACatenaComponent implements OnInit {

  index = 0;
  showTimer = true;
  points = 0;
  words: string[] = [];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta le parole del gioco.
   */
  private setNames() {

    const charsString = prompt("Inserisci le parole.", "Genesi Salomone Apostolo Arca Patto");

    if (!charsString || charsString === "") this.closeGame();

    else this.words = charsString.split(" ").map(c => c.toUpperCase());
  }

  /**
   * Chiude il gioco.
   */
  private closeGame() {

    alert("Per poter giocare assicurati di aggiungere delle parole.");
    setTimeout(() => this.payload.gioco = -1, 0);
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index !== this.words.length - 1) {

        this.index++;
        this.startTimer();
      }
    }

    // Va indietro
    if (event.code === "ArrowLeft") {

      if (this.index > 0) {

        this.index--;
        this.startTimer();
      }
    }

    // Risposta esatta
    if (event.code === "Enter") this.setPoints(true, !event.shiftKey);

    // Risposta sbagliata
    if (["Delete", "Backspace"].includes(event.code)) this.setPoints(false, !event.shiftKey);
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
      if (playSound) play(result ? "success" : "error");
    }
  }

  /**
   * Fa ripartire il timer.
   */
  private startTimer() {

    this.payload.stopTimer$.next();

    setTimeout(() => this.payload.startTimer$.next());
  }
}
