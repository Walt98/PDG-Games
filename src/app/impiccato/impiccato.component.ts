import { Component, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-impiccato',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impiccato.component.html',
  styleUrl: './impiccato.component.scss'
})
export class ImpiccatoComponent implements OnInit {

  index = 0;
  words: string[] = [];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setNames();
  }

  /**
   * Imposta le parole del gioco.
   */
  private setNames() {

    const charsString = prompt("Inserisci le parole.", "Rivelazione, 1 Samuele, Grace Party, Efod, Betesda");

    if (!charsString || charsString === "") this.closeGame();

    else this.words = charsString.split(",").map(c => c.trim().toUpperCase());
  }

  /**
   * Chiude il gioco.
   */
  private closeGame() {

    alert("Per poter giocare assicurati di aggiungere delle parole.");
    setTimeout(() => this.payload.gioco = -1, 0);
  }

  /**
   * Restituisce il background-image corretto dell'impiccato.
   */
  public getImage(index: number) {

    return `background-image: url("/impiccato${index}.jpg")`;
  }
}
