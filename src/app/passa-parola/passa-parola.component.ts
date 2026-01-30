import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { HandlerBase } from '../handler-base.directive';

declare type PassaParola = { key: string; status: string; }

@Component({
  selector: 'app-passa-parola',
  standalone: true,
  imports: [CommonModule, TimerComponent],
  templateUrl: './passa-parola.component.html',
  styleUrl: './passa-parola.component.scss'
})
export class PassaParolaComponent extends HandlerBase implements OnInit {

  index?: number;
  tmpIndex?: number;
  isReady = false;
  items: PassaParola[] = [];

  ngOnInit(): void {

    this.setFields();
  }

  /**
   * Imposta tutti i campi tramite prompt.
   */
  private setFields() {

    let charsString = prompt("Inserisci le tue lettere (min. 1, max. 15). Assicurati di non inserire numeri e caratteri speciali e che ogni lettera sia ben separata l'una dall'altra.", "A, B, C, D, E, F");

    if (charsString?.length) {

      let allChars = this.mapPrompt(charsString);
      let chars: string[] = [];

      if (allChars.find(c => c.length > 1)) {
        this.closeGame(`Assicurati di aver separato tutte le lettere e di non aver inserito numeri e caratteri speciali, in modo da avere qualcosa tipo "A, B, C, D, E, F".`);
        return;
      }

      else if (allChars.find(c => !/^[a-zA-Z]$/.test(c))) {
        this.closeGame(`Assicurati di inserire solo lettere, in modo da avere qualcosa tipo "A, B, C, D, E, F".`);
        return;
      }

      else allChars.forEach(c => {
        if (c !== "") chars.push(c.toUpperCase());
      });

      if (!chars.length || chars.length > 15) {

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

      this.play("skip");
      item.status = "skip";
    }

    else if (item.status === "skip") {

      this.play("success");
      item.status = "success";
    }

    else if (item.status === "success") {

      this.play("error");
      item.status = "error";
    }

    else item.status = "";
  }

  override passaParolaHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      if (this.code.includes("Key") && !this.ctrlKey && !this.metaKey && !this.altKey) {

        let item = this.items.find(i => i.key === this.code[3]);

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
      if (this.code === "ArrowRight") {

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
      if (this.code === "ArrowLeft") {

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
      if (this.code.includes("Shift")) {

        if (this.index !== undefined) {

          this.items[this.index].status = "skip";
          this.play("skip");
        }
      }

      // Corretto
      if (this.code === "Enter") {

        if (this.index !== undefined) {

          this.items[this.index].status = "success";
          this.play("success");

          this.stopTimer();
        }
      }

      // Sbagliato
      if (this.code === "Backspace" && !this.metaKey) {

        if (this.index !== undefined) {

          this.items[this.index].status = "error";
          this.play("error");

          this.stopTimer();
        }
      }

      // Nessuno status
      if (this.code === "Delete" || (this.metaKey && this.code === "Backspace")) {

        if (this.index !== undefined) this.items[this.index].status = "";
      }

      // Nessun index
      if (this.code === "Escape") {

        if (this.index !== undefined) this.tmpIndex = this.index;
        this.index = undefined;
      }
    }
  }
}
