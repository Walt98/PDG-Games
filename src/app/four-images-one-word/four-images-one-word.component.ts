import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { PayloadService } from '../payload.service';

@Component({
  selector: 'app-four-images-one-word',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './four-images-one-word.component.html',
  styleUrl: './four-images-one-word.component.scss'
})
export class FourImagesOneWordComponent implements OnInit {

  words: string[] = [];
  index = 0;
  showLetters = false;
  showTimer = true;

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    const words = ["Mosè", "Davide", "Pietro", "Isacco", "Elia", "Aaronne"];
    words.forEach(w => this.words.push(w.toUpperCase()));
    this.startTimer();
  }

  /**
   * Restituisce il background-image del singolo quadrante.
   */
  getImage(index: number): string {

    return `background-image: url("/card2_${this.index}_${index}.jpg")`;
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
        this.startTimer();
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
        this.startTimer();
      }
    }

    // Risposta esatta
    if (event.code === "Enter") {

      this.showLetters = true;
      this.payload.stopTimer$.next();
      const audio = new Audio("/success.mp3");
      audio.play();
    }
  }

  /**
   * Metodo che fa partire il timer.
   */
  private startTimer() {

    setTimeout(() => this.payload.startTimer$.next(), 2);
  }
}
