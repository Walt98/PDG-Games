import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandlerBase } from '../handler-base.directive';
import { IHiddenCharItem } from '../hidden-char-item';

@Component({
  selector: 'app-impiccato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impiccato.component.html',
  styleUrl: './impiccato.component.scss'
})
export class ImpiccatoComponent extends HandlerBase implements OnInit {

  index = 0;
  imageIndex = 0;
  showWord = false;
  wrong: string[] = [];
  items: IHiddenCharItem[][] = [];

  ngOnInit(): void {

    this.setWords();
  }

  /**
   * Imposta le parole del gioco.
   */
  private setWords() {

    const wordsString = prompt("Inserisci le parole.", "Rivelazione, 1 Samuele, Grace Party, Efod, Betesda");

    if (wordsString?.length) this.mapPrompt(wordsString).forEach(w => {

      let word: IHiddenCharItem[] = [];

      w.split("").forEach(c => word.push({ char: c, show: !this.checkIfIsLetter(c, true) }));
      this.items.push(word);
    });

    else this.closeGame("Per poter giocare assicurati di aggiungere delle parole.");
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

    this.items[this.index].forEach(i => i.show = !this.checkIfIsLetter(i.char, true));
  }

  /**
   * Restituisce la stringa in parametro senza vocali accentate.
   */
  private normalize(str: string) {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * Verifica se il carattere in parametro è una lettera; in tal caso restituirà true, altrimenti false.
   */
  public checkIfIsLetter(key: string, normalize = false) {

    return /^[a-zA-Z]$/.test(normalize ? this.normalize(key) : key);
  }

  /**
   * Restituisce il background-image corretto dell'impiccato.
   */
  public getImage() {

    return `background-image: url("/impiccato${this.imageIndex}.jpg")`;
  }

  override impiccatoHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Si può cambiare pagina solo se la parola è
      // completamente visibile oppure forzando utilizzando Shift
      const canChange = this.showWord || this.shiftKey;

      // Va avanti
      if (this.code === "ArrowRight") {

        if (this.index !== this.items.length - 1 && canChange) this.changeWord();
      }

      // Va indietro
      if (this.code === "ArrowLeft") {

        if (this.index > 0 && canChange) this.changeWord(true);
      }

      if (this.checkIfIsLetter(this.key) && !this.ctrlKey && !this.metaKey && !this.altKey) {

        const key = this.key.toUpperCase();

        if (!this.wrong.includes(key)) {

          let guessed = this.items[this.index].filter(i => this.normalize(i.char) === key);

          guessed.forEach(i => i.show = true);

          if (!this.items[this.index].map(i => i.show).includes(false)) {

            if (!this.showWord) this.play("success");
            this.showWord = true;
          }

          if (!guessed.length && this.imageIndex < 6 && !this.showWord) {

            this.imageIndex++;

            if (this.imageIndex === 6) {

              this.showWord = true;
              this.play("gong");
            }

            else {

              this.wrong.push(key);
              this.play("error");
            }
          }
        }
      }

      // Parola indovinata
      if (this.code === "Enter") {

        if (!this.showWord) this.play("success");
        this.showWord = true;
      }

      // Parola sbagliata
      if (this.code === "Backspace") {

        if (this.imageIndex > 0 && this.imageIndex < 6) {

          this.imageIndex--;
          this.wrong.pop();
        }
      }
    }
  }
}
