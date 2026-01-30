import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-four-images-one-word',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './four-images-one-word.component.html',
  styleUrl: './four-images-one-word.component.scss'
})
export class FourImagesOneWordComponent extends HandlerBase {

  index = 0;
  showLetters = false;
  words = [ "MOSÈ", "DAVIDE", "PIETRO", "ISACCO", "ELIA", "AARONNE", "66", "PAOLO", "ADAMO", "EBREI", "COMANDAMENTI", "APOCALISSE", "VANGELI", "PASTORE", "SALMI", "DANIELE", "APOSTOLO", "SANSONE", "GRACE PARTY", "CHIESA" ];

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

    this.timerRxJS(3000, () => this.showLetters = true);
  }

  /**
   * Metodo che mostra la parola.
   */
  showWord(isClick = false) {

    if (this.showLetters && isClick) {

      if (this.index !== this.words.length - 1) {

        this.showLetters = false;
        this.restartTimer();

        this.index++;
      }
    }

    else {

      this.showLetters = true;
      this.payload.stopTimer$.next();
      this.play("success");
    }
  }

  override fourImagesOneWordHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Va avanti
      if (this.code === "ArrowRight") {

        if (this.index !== this.words.length - 1 && (this.showLetters || this.shiftKey)) {

          this.showLetters = false;
          this.restartTimer();

          this.index++;
        }
      }

      // Va indietro
      if (this.code === "ArrowLeft") {

        if (this.index !== 0 && (this.showLetters || this.shiftKey)) {

          this.showLetters = false;
          this.restartTimer();

          this.index--;
        }
      }

      // Risposta esatta
      if (this.code === "Enter") this.showWord();

      // Risposta sbagliata
      if (["Delete", "Backspace"].includes(this.code)) this.showLetters = false;
    }
  }
}
