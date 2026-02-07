import { Component, OnInit } from '@angular/core';
import { HandlerBase } from '../handler-base.directive';
import { CommonModule } from '@angular/common';
import { IHiddenCharItem } from '../hidden-char-item';

@Component({
  selector: 'app-guess-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guess-logo.component.html',
  styleUrl: './guess-logo.component.scss'
})
export class GuessLogoComponent extends HandlerBase implements OnInit {

  index = 0;
  showLogo = false;
  tries = 0;
  logos = ["McDonald's", "Apple", "Warner Bros", "Air Jordan", "Nike", "Beats", "Pinterest", "Starbucks", "Volkswagen", "Vodafone", "Maserati", "Lacoste", "Toyota", "Juventus", "Playboy", "WWF", "Tesla", "Unicredit", "Timberland", "Parola della Grazia"];
  items: IHiddenCharItem[][] = [];

  ngOnInit() {
    
    this.setItems();
  }

  private setItems() {

    this.logos.forEach(l => {

      let word: IHiddenCharItem[] = [];
  
      l.toUpperCase().split("")
      .forEach(c => word.push({ char: c, show: !this.checkIfIsLetter(c, true) }));

      this.items.push(word);
    });
  }

  /**
   * Restituisce la stringa in parametro senza vocali accentate.
   */
  private normalize(str: string) {

    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  /**
   * Cambia il logo in base alla freccia (sinistra/destra) premuta.
   * @param back Se true viene visualizzato il logo precedente, altrimenti il successivo
   */
  private changeLogo(back = false) {

    const backward = back && this.index > 0;
    const forward = !back && this.index < this.items.length - 1;

    if (backward || forward) {

      this.showLogo = false;
      this.tries = 0;


      if (back) this.index--;
      else this.index++;

      this.items[this.index].forEach(i => i.show = !this.checkIfIsLetter(i.char, true));
    }
  }

  /**
   * Mostra il nome del logo e riproduce il suono in parametro.
   */
  private showLogoName(track: "success" | "error") {

    if (!this.showLogo) this.play(track);
    this.showLogo = true;
  }

  /**
   * Restituisce il background-image del singolo quadrante.
   */
  getImage() {

    return `background-image: url("/game7_${this.index}.jpg")`;
  }

  /**
   * Verifica se il carattere in parametro è una lettera; in tal caso restituirà true, altrimenti false.
   */
  checkIfIsLetter(key: string, normalize = false) {

    return /^[a-zA-Z]$/.test(normalize ? this.normalize(key) : key);
  }

  onClick() {

    if (this.showLogo) {

      if (this.index < this.items.length - 1) {

        this.showLogo = false;
        this.index++;
      }
    }

    else this.showLogoName("success");
  }

  override guessLogoHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Si può cambiare pagina solo se la parola è
      // visibile oppure forzando utilizzando Shift
      if (this.showLogo || this.shiftKey) {

        // Va avanti
        if (this.code === "ArrowRight") this.changeLogo();

        // Va indietro
        if (this.code === "ArrowLeft") this.changeLogo(true);
      }

      // Parola indovinata
      if (this.code === "Enter") this.showLogoName("success");

      // Parola sbagliata
      if (this.code === "Backspace") {

        if (this.showLogo) {
          this.showLogo = false;
          this.tries = 0;
        }

        else {

          if (this.tries < 2) {
            this.tries++;
            this.play("error");
          }

          else this.showLogoName("error");
        }
      }
    }
  }
}
