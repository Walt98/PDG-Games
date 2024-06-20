import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';

@Component({
  selector: 'app-lista-giochi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-giochi.component.html',
  styleUrl: './lista-giochi.component.scss'
})
export class ListaGiochiComponent implements OnInit {

  index?: number;
  tmpIndex?: number;
  showComingSoon = false;
  cards = [
    "Passa-Parola di Dio",
    "4 Immagini 1 Parola di Dio",
    "Prossimamente" // Questa stringa deve rimanere l'ultima dell'array
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

  /**
   * Seleziona il gioco.
   */
  onSelectGame(index: number) {

    if (index !== this.cards.length - 1) this.payload.gioco = index;
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
