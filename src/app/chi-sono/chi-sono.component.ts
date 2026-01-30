import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { CommonModule } from '@angular/common';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-chi-sono',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './chi-sono.component.html',
  styleUrl: './chi-sono.component.scss'
})
export class ChiSonoComponent extends HandlerBase implements OnInit {

  index = 0;
  showName = false;
  characters: string[] = [];
  randomized: string[] = [];

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta i nomi del gioco.
   */
  private setNames() {

    const charsString = prompt("Inserisci i nomi.", "Giobbe, Ester, Pietro, Timoteo, Giosuè");

    if (charsString?.length) {

      this.characters = this.mapPrompt(charsString);

      if (this.characters.find(c => c.split(" ").length > 1)) {
        this.closeGame(`Al momento non è possibile inserire nomi di più parole, come ad esempio "Giovanni Battista" o quello che hai inserito tu.`);
      }

      else this.characters.forEach(c => this.randomized.push(this.shuffle(c)));
    }

    else this.closeGame("Per poter giocare assicurati di aggiungere dei nomi.");
  }

  /**
   * Restituisce il parametro ma con i caratteri mescolati.
   */
  private shuffle(name: string): string {

    let arr = name.split("");

    for (let i = arr.length - 1; i > 0; i--) {

      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    const res = arr.join("");

    return res !== name ? res : this.shuffle(res);
  }

  /**
   * Mostra la parola corretta.
   */
  show(isClick = false) {

    if (this.showName && isClick) {

      if (this.index !== this.randomized.length - 1) {

        this.showName = false;
        this.restartTimer();

        this.index++;
      }
    }

    else {

      this.showName = true;
      this.payload.stopTimer$.next();
      this.play("success");
    }
  }

  /**
   * Evento timeout del timer.
   */
  onTimeout() {

    this.timerRxJS(3000, () => this.showName = true);
  }

  override chiSonoHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Va avanti
      if (this.code === "ArrowRight") {

        if (this.index !== this.randomized.length - 1 && (this.showName || this.shiftKey)) {

          this.showName = false;
          this.restartTimer();

          this.index++;
        }
      }

      // Va indietro
      if (this.code === "ArrowLeft") {

        if (this.index !== 0 && (this.showName || this.shiftKey)) {

          this.showName = false;
          this.restartTimer();

          this.index--;
        }
      }

      // Risposta esatta
      if (this.code === "Enter") this.show();

      // Risposta sbagliata
      if (["Delete", "Backspace"].includes(this.code)) {

        this.payload.stopTimer$.next();
        this.play("error");
        this.showName = true;
      }
    }
  }
}
