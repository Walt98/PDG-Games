import { Component, HostListener, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';
import { CommonModule } from '@angular/common';
import { play } from '../common-functions';

declare type ImpiccatoCharItem = { char: string; show: boolean; }

@Component({
  selector: 'app-impiccato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impiccato.component.html',
  styleUrl: './impiccato.component.scss'
})
export class ImpiccatoComponent implements OnInit {

  index = 0;
  imageIndex = 0;
  showWord = false;
  wrong: string[] = [];
  items: ImpiccatoCharItem[][] = [];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta le parole del gioco.
   */
  private setNames() {

    const wordsString = prompt("Inserisci le parole.", "Rivelazione, 1 Samuele, Grace Party, Efod, Betesda");

    if (!wordsString || wordsString === "") this.closeGame();

    else wordsString.split(",").map(c => c.trim().toUpperCase()).forEach(w => {

      // Ho provato a usare il metodo replace ma non ha funzionato
      // Alla fine ho optato per una rimozione "forzata" degli spazi in più
      const trimmed = w.split(" ").filter(c => c !== "").join(" ");

      let word: ImpiccatoCharItem[] = [];

      trimmed.split("").forEach(c => word.push({ char: c, show: !this.checkIfIsLetter(c) }));
      this.items.push(word);
    });
  }

  /**
   * Chiude il gioco.
   */
  private closeGame() {

    alert("Per poter giocare assicurati di aggiungere delle parole.");
    setTimeout(() => this.payload.gioco = -1, 0);
  }

  /**
   * Cambia la parola in base alla freccia (sinistra/destra) premuta.
   * @param back Parametro che, se true, farà visualizzare la parola precedente
   */
  private changeWord(back = false) {

    this.showWord = false;
    this.wrong = [];
    this.imageIndex = 0;

    if (back) this.index--;
    else this.index++;

    this.items[this.index].forEach(i => i.show = !this.checkIfIsLetter(i.char));
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index !== this.items.length - 1) this.changeWord();
    }

    // Va indietro
    if (event.code === "ArrowLeft") {

      if (this.index > 0) this.changeWord(true);
    }

    if (this.checkIfIsLetter(event.key) && !event.ctrlKey && !event.shiftKey) {

      const key = event.key.toUpperCase();

      if (!this.wrong.includes(key)) {

        let guessed = this.items[this.index].filter(i => i.char === key);
        guessed.forEach(item => item.show = true);

        if (!guessed.length && this.imageIndex < 6) {

          this.imageIndex++;

          if (this.imageIndex === 6) {

            this.showWord = true;
            play("gong");
          }

          else {

            this.wrong.push(key);
            play("error");
          }
        }
      }
    }

    // Risposta esatta
    if (event.code === "Enter") {

      if (!this.showWord) play("success");
      this.showWord = true;
    }

    // Risposta sbagliata
    if (["Delete", "Backspace"].includes(event.code)) {

      if (this.imageIndex > 0 && this.imageIndex < 6) {

        this.imageIndex--;
        this.wrong.pop();
      }
    }
  }

  /**
   * Verifica se il carattere in parametro è una lettera; in tal caso restituirà true, altrimenti false.
   */
  public checkIfIsLetter(key: string) {

    return /^[a-zA-Z]$/.test(key);
  }

  /**
   * Restituisce il background-image corretto dell'impiccato.
   */
  public getImage() {

    return `background-image: url("/impiccato${this.imageIndex}.jpg")`;
  }
}
