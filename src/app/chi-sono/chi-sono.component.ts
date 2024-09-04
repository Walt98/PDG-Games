import { Component, HostListener, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';
import { play } from '../common-functions';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chi-sono',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './chi-sono.component.html',
  styleUrl: './chi-sono.component.scss'
})
export class ChiSonoComponent implements OnInit {

  index = 0;
  showName = false;
  showTimer = true;
  characters: string[] = [];
  randomized: string[] = [];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta i nomi del gioco.
   */
  private setNames() {

    const charsString = prompt("Inserisci i nomi.", "Giobbe Ester Pietro Timoteo Giosuè");

    if (!charsString || charsString === "") this.closeGame();

    else {
      this.characters = charsString.split(" ").map(c => c.toUpperCase());
      this.characters.forEach(c => this.randomized.push(this.shuffle(c)));
    }
  }

  /**
   * Chiude il gioco.
   */
  private closeGame() {

    alert("Per poter giocare assicurati di aggiungere dei nomi.");
    setTimeout(() => this.payload.gioco = -1, 0);
  }

  /**
   * Metodo che restituisce l'anagramma del parametro.
   */
  private shuffle(name: string) {

    const arr = name.split("");

    for (let i = arr.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.join("");
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index !== this.randomized.length - 1 && (this.showName || event.shiftKey)) {
        this.showName = false;
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

      if (this.index !== 0 && (this.showName || event.shiftKey)) {
        this.showName = false;
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
      this.showName = true;
    }
  }

  /**
   * Mostra la parola corretta.
   */
  show(isClick = false) {

    if (this.showName && isClick) {

      if (this.index !== this.randomized.length - 1) {

        this.showName = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index++;
      }
    }

    else {

      this.showName = true;
      this.payload.stopTimer$.next();
      play("success");
    }
  }

  /**
   * Evento timeout del timer.
   */
  onTimeout() {

    setTimeout(() => this.showName = true, 3000);
  }
}
