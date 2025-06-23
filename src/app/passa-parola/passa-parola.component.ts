import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { PayloadService } from '../payload.service';
import { play } from '../common-functions';

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

    let charsString = prompt("Inserisci le lettere (min. 1 e max. 15).", "A B C D E F");

    if (!!charsString) {

      let allChars = charsString.split(" ");
      let chars: string[] = [];

      allChars.forEach(c => {
        if (c !== "") chars.push(c.toUpperCase());
      });

      if (chars.length < 1 || chars.length > 15) {

        alert("Per poter giocare assicurati di inserire un numero di lettere compreso tra 1 e 15.");
        this.closeGame();
      }

      else chars.forEach((char, i) => {

        this.items.push({ key: char, status: "" });
        if (i === +chars.length - 1) this.isReady = true;
      });
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
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      if (event.code.includes("Key") && !event.ctrlKey && !event.metaKey && !event.altKey) {

        let item = this.items.find(i => i.key === event.code[3]);

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
      if (event.code === "ArrowRight") {

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
      if (event.code === "ArrowLeft") {

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
      if (event.code.includes("Shift")) {

        if (this.index !== undefined) {

          this.items[this.index].status = "skip";
          play("skip");
        }
      }

      // Corretto
      if (event.code === "Enter") {

        if (this.index !== undefined) {

          this.items[this.index].status = "success";
          play("success");

          this.stopTimer();
        }
      }

      // Sbagliato
      if (event.code === "Backspace" && !event.metaKey) {

        if (this.index !== undefined) {

          this.items[this.index].status = "error";
          play("error");

          this.stopTimer();
        }
      }

      // Nessuno status
      if (event.code === "Delete" || (event.metaKey && event.code === "Backspace")) {

        if (this.index !== undefined) this.items[this.index].status = "";
      }

      // Nessun index
      if (event.code === "Escape") {

        if (this.index !== undefined) this.tmpIndex = this.index;
        this.index = undefined;
      }
    }
  }

  /**
   * Se non ci sono altre lettere su cui posizionarsi ferma il timer.
   */
  stopTimer() {

    const statusSet = [...new Set(this.items.map(i => i.status))];

    if (!statusSet.includes("") && !statusSet.includes("skip")) {

      this.payload.stopTimer$.next();
    }
  }

  /**
   * Cambia lo status dell'item.
   */
  setStatus(item: PassaParola) {

    if (item.status === "") {

      play("skip");
      item.status = "skip";
    }

    else if (item.status === "skip") {

      play("success");
      item.status = "success";
    }

    else if (item.status === "success") {

      play("error");
      item.status = "error";
    }

    else item.status = "";
  }
}
