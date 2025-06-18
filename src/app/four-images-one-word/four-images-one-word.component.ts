import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { PayloadService } from '../payload.service';
import { play } from '../common-functions';

@Component({
  selector: 'app-four-images-one-word',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './four-images-one-word.component.html',
  styleUrl: './four-images-one-word.component.scss'
})
export class FourImagesOneWordComponent {

  index = 0;
  showLetters = false;
  showTimer = true;
  words = [
    "Mosè",
    "Davide",
    "Pietro",
    "Isacco",
    "Elia",
    "Aaronne",
    "66",
    "Paolo",
    "Adamo",
    "Ebrei",
    "Comandamenti",
    "Apocalisse",
    "Vangeli",
    "Pastore",
    "Salmi",
    "Daniele",
    "Apostolo",
    "Sansone",
    "Grace Party",
    "Chiesa"
  ].map(w => w.toUpperCase());

  constructor(public payload: PayloadService) { }

  /**
   * Restituisce il background-image del singolo quadrante.
   */
  getImage(index: number): string {

    return `background-image: url("/game2_${this.index}_${index}.jpg")`;
  }

  /**
   * Evento timeout del timer.
   */
  onTimeout() {

    setTimeout(() => this.showLetters = true, 3000);
  }

  /**
   * Evento keydown.
   */
  @HostListener('document:keydown', ['$event']) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index !== this.words.length - 1 && (this.showLetters || event.shiftKey)) {
        this.showLetters = false;
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

      if (this.index !== 0 && (this.showLetters || event.shiftKey)) {
        this.showLetters = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index--;
      }
    }

    // Risposta esatta
    if (event.code === "Enter") this.showWord();

    // Risposta sbagliata
    if (["Delete", "Backspace"].includes(event.code)) this.showLetters = false;
  }

  /**
   * Metodo che mostra la parola.
   */
  showWord(isClick = false) {

    if (this.showLetters && isClick) {

      if (this.index !== this.words.length - 1) {

        this.showLetters = false;
        this.showTimer = false;

        setTimeout(() => {
          this.showTimer = true;
          this.payload.timerSubscription?.unsubscribe();
        }, 1);

        this.index++;
      }
    }

    else {

      this.showLetters = true;
      this.payload.stopTimer$.next();
      play("success");
    }
  }
}
