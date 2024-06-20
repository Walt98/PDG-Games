import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { PayloadService } from './payload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PassaParolaComponent,
    FourImagesOneWordComponent
  ]
})
export class AppComponent implements OnInit {

  title = 'pdg-games';

  index?: number;
  tmpIndex?: number;
  showComingSoon = false;
  cards = [
    "Passa-Parola di Dio",
    "4 Immagini 1 Parola di Dio",
    "Prossimamente"
  ];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    setTimeout(() => this.showComingSoon = true, 2000);
  }

  /**
   * Restituisce lo stile background-image della singola card. 
   */
  getCardImage(index: number) {

    const res = index === this.cards.length - 1
      ? "coming-soon"
      : `card${index + 1}`;

    return `background-image: url("/${res}.jpg")`;
  }

  onSelectGame(index: number) {

    if (index !== this.cards.length - 1) this.payload.gioco = index;
  }

  /**
   * Chiude il gioco.
   */
  onClose() {

    if (this.payload.gioco > -1) this.payload.gioco = -1;
  }

  /**
   * Evento keydown nella home.
   */
  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (this.payload.gioco === -1) {

      // Va avanti
      if (code === "ArrowRight") {

        if (this.tmpIndex !== this.index) this.index = this.tmpIndex;
        else {

          if (this.index === undefined || this.index === this.cards.length - 2) this.index = 0;
          else this.index++;
          this.tmpIndex = this.index;
        }
      }

      // Va indietro
      if (code === "ArrowLeft") {

        if (this.tmpIndex !== this.index) this.index = this.tmpIndex;
        else {

          if (this.index === undefined) this.index = 0;
          else if (this.index === 0) this.index = this.cards.length - 2;
          else this.index--;
          this.tmpIndex = this.index;
        }
      }

      // Seleziona il gioco
      if (code === "Enter") {

        if (this.index !== undefined) {
          this.payload.gioco = this.index;
          this.index = undefined;
          this.tmpIndex = undefined;
        }
      }

      // Nessun index
      if (code === "Escape") {

        if (this.index !== undefined) this.tmpIndex = this.index;
        this.index = undefined;
      }
    }
  }
}
