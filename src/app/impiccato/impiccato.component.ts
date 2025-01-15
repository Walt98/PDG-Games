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
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    // Va avanti
    if (event.code === "ArrowRight") {

      if (this.index !== this.items.length - 1) {

        this.index++;
        this.imageIndex = 0;
      }
    }

    // Va indietro
    if (event.code === "ArrowLeft") {

      if (this.index > 0) {

        this.index--;
        this.imageIndex = 0;
      }
    }

    if (this.checkIfIsLetter(event.key)) {

      const key = event.key.toUpperCase();

      let guessed = this.items[this.index].filter(item => item.char === key);
      guessed.forEach(item => item.show = true);

      if (!guessed.length && this.imageIndex < 6) {

        this.imageIndex++;
        play("error");
      }
    }

    // Risposta esatta
    if (event.code === "Enter") {

      this.showWord = true;
    }

    // // Risposta sbagliata
    if (["Delete", "Backspace"].includes(event.code)) {
      
      if (this.imageIndex < 6) {

        this.imageIndex++;
        play("error");

        if (this.imageIndex === 6) this.showWord = true;
      }
    }
  }

  public checkIfIsLetter(key: string) {

    return /^[a-zA-Z]$/.test(key);
  }

  /**
   * Restituisce il background-image corretto dell'impiccato.
   */
  public getImage(index: number) {

    return `background-image: url("/impiccato${index}.jpg")`;
  }
}
