import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { PayloadService } from '../payload.service';

declare type PassaParola = { key: string; status: string; }

@Component({
  selector: 'app-passa-parola',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './passa-parola.component.html',
  styleUrl: './passa-parola.component.scss'
})
export class PassaParolaComponent implements OnInit {

  index?: number;
  tmpIndex?: number;
  isReady = false;
  items: PassaParola[] = [];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setFields();
  }

  /**
   * Imposta tutti i campi tramite prompt.
   */
  private setFields() {

    let n = prompt("Inserisci il numero di lettere.", "6");

    if (!!n && +n >= 0) {

      if (+n >= 1 && +n <= 15) {

        for (let i = 0; i < +n; i++) {
  
          let item = prompt(`Inserisci la ${i + 1}ª lettera.`);
  
          if (!!item) {
            this.items.push({ key: item.toUpperCase(), status: "" });
  
            if (i === +n - 1) this.isReady = true;
          }
          else {
            this.closeGame();
            break;
          }
        }
      }
  
      else {
        alert("Assicurati di inserire un numero compreso tra 1 e 15 per continuare.");
        this.closeGame();
      }
    }

    else this.closeGame();
  }

  /**
   * Chiude il gioco.
   */
  private closeGame() {

    setTimeout(() => this.payload.gioco = -1, 0);
  }

  /**
   * Imposta l'index e lo status delle lettere.
   */
  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (code.includes("Key")) {

      let item = this.items.find(i => i.key === code[3]);
      if (!!item) {
        this.index = this.items.indexOf(item);
        this.tmpIndex = this.index;
      }
    }

    let allSetted = true;

    this.items.forEach(el => {
      if (["", "skip"].includes(el.status)) allSetted = false;
    })

    // Va solo avanti
    if (code === "ArrowRight") {

      if (this.tmpIndex !== this.index && !allSetted) this.index = this.tmpIndex;
      else {

        if (this.index === undefined) {
          if (!allSetted) this.index = 0;
        }

        else if (this.index === this.items.length - 1) {

          this.index = 0;

          if (!allSetted) {
            while (!["", "skip"].includes(this.items[this.index].status)) this.index++;
          }
          else this.index = undefined;
        }

        else {

          if (!allSetted) {
            do {
              if (this.index === this.items.length - 1) this.index = 0;
              else (this.index)++;
            }
            while (!["", "skip"].includes(this.items[(this.index)].status));
          }

          else this.index = undefined;
        }

        this.tmpIndex = this.index;
      }
    }

    // Va solo indietro
    if (code === "ArrowLeft") {

      if (this.tmpIndex !== this.index && !allSetted) this.index = this.tmpIndex;
      else {

        if (this.index === undefined) {
          if (!allSetted) this.index = 0;
        }

        else if (this.index === 0) {

          this.index = this.items.length - 1;

          if (!allSetted) {
            while (!["", "skip"].includes(this.items[this.index].status)) this.index--;
          }
          else this.index = undefined;
        }

        else {

          let allSetted = true;

          this.items.forEach(el => {
            if (["", "skip"].includes(el.status)) allSetted = false;
          });

          if (!allSetted) {
            do {
              if (this.index === 0) this.index = this.items.length - 1;
              else this.index--;
            }
            while (!["", "skip"].includes(this.items[this.index].status));
          }

          else this.index = undefined;
        }

        this.tmpIndex = this.index;
      }
    }

    // PassaParola
    if (code.includes("Shift")) {

      if (this.index !== undefined) {

        this.items[this.index].status = "skip";
        const audio = new Audio("/skip.mp3");
        audio.play();
      }
    }

    // Corretto
    if (code === "Enter") {

      if (this.index !== undefined) {

        this.items[this.index].status = "success";
        const audio = new Audio("/success.mp3");
        audio.play();
      }
    }

    // Sbagliato
    if (code === "Backspace") {

      if (this.index !== undefined) {

        this.items[this.index].status = "error";
        const audio = new Audio("/error.mp3");
        audio.play();
      }
    }

    // Nessuno status
    if (code === "Delete") {

      if (this.index !== undefined) this.items[this.index].status = "";
    }

    // Nessun index
    if (code === "Escape") {

      if (this.index !== undefined) this.tmpIndex = this.index;
      this.index = undefined;
    }
  }

  /**
   * Cambia lo status dell'item.
   */
  setStatus(item: PassaParola) {

    if (item.status === "") {

      const audio = new Audio("/skip.mp3");
      audio.play();
      item.status = "skip";
    }

    else if (item.status === "skip") {

      const audio = new Audio("/success.mp3");
      audio.play();
      item.status = "success";
    }

    else if (item.status === "success") {

      const audio = new Audio("/error.mp3");
      audio.play();
      item.status = "error";
    }

    else item.status = "";
  }
}
