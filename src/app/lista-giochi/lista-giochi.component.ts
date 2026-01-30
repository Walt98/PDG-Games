import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICard } from '../card';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-lista-giochi',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-giochi.component.html',
  styleUrl: './lista-giochi.component.scss'
})
export class ListaGiochiComponent extends HandlerBase implements OnInit {

  index?: number;
  tmpIndex?: number;
  showComingSoon = false;
  cards: ICard[] = [
    { title: "Passa-Parola di Dio" },
    { title: "4 Immagini 1 Parola di Dio" },
    { title: "Chi sono?" },
    { title: "Completa il verso" },
    { title: "Reazione a catena" },
    { title: "Impiccato" },
    { title: "Indovina il logo" },
    { title: "Prossimamente" }
  ];

  ngOnInit(): void {

    this.changeComingSoonPosition();
    this.timerRxJS(2000, () => this.showComingSoon = true);
  }

  /**
   * Motodo che sposta l'elemento "Prossimamente" dell'array cards mettendolo all'ultimo posto se non si trova già lì.
   */
  private changeComingSoonPosition() {

    if (this.cards[this.cards.length - 1].title !== "Prossimamente") {

      const comingSoongIndex = this.cards.indexOf({ title: "Prossimamente" });
      this.cards.splice(this.cards.length - 1, 0, this.cards.splice(comingSoongIndex, 1)[0]);
    }
  }

  /**
   * Restituisce lo stile background-image della singola card. 
   */
  getCardImage(index: number) {

    const cond = index === this.cards.length - 1 || this.cards[index].title === "Prossimamente";
    const res = cond ? "coming-soon" : `card${index + 1}`;

    return `background-image: url("/${res}.jpg")`;
  }

  /**
   * Seleziona il gioco.
   */
  onSelectGame(index: number) {

    if (index !== this.cards.length - 1) {

      this.payload.gioco = index;
    }
  }

  override listaGiochiHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Entra qui quando index = undefined ma mi ero già mosso tra i giochi
      if (["ArrowRight", "ArrowLeft"].includes(this.code) && this.tmpIndex !== this.index) {

        this.index = this.tmpIndex;
      }

      else {

        // Esamino le card e vedo se tutti gli elementi sono nascosti o meno
        const cardsStatus = this.cards.map(c => c?.hidden);
        const hidden = cardsStatus.filter(s => !!s);

        // Escludo l'ultima card perché non serve tenerla in considerazione
        const cards = [...this.cards.filter(c => c.title !== "Prossimamente")];

        if (hidden.length !== cards.length) {

          /**
           * COMMENTO VALIDO PER TUTTI I CICLI WHILE / DO-WHILE
           * 
           * Essi servono a evitare di posizionarsi su una card nascosta
          */

          // Va avanti
          if (this.code === "ArrowRight") {

            if (this.index === undefined || this.index === this.cards.length - 2) {

              this.index = 0;
              while (this.cards[this.index]?.hidden) this.index++;
            }

            else {

              do {
                if (this.index === this.cards.length - 2) this.index = 0;
                else this.index++;
              }
              while (this.cards[this.index]?.hidden);
            }

            this.tmpIndex = this.index;
          }

          // Va indietro
          if (this.code === "ArrowLeft") {

            if (this.index === undefined) {

              this.index = 0;

              while (this.cards[this.index]?.hidden) {
                if (this.index === 0) this.index = this.cards.length - 2;
                else this.index--;
              };
            }

            else if (this.index === 0) {

              this.index = this.cards.length - 2;

              while (this.cards[this.index]?.hidden) this.index--;
            }

            else {

              do {
                if (this.index === 0) this.index = this.cards.length - 2;
                else this.index--;
              }
              while (this.cards[this.index]?.hidden);
            }

            this.tmpIndex = this.index;
          }

          // Seleziona il gioco
          if (this.code === "Enter") {

            if (this.index !== undefined) {

              this.payload.gioco = this.index;
              this.index = undefined;
              this.tmpIndex = undefined;
            }
          }

          // Nessun index
          if (this.code === "Escape" && !this.payload.showClassification && !this.payload.showHelp) {

            if (this.index !== undefined) this.tmpIndex = this.index;
            this.index = undefined;
          }
        }

        // Tutte le card sono wip
        else this.index = undefined;
      }
    }
  }
}
