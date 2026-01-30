import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGiocatore } from '../giocatore';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-classifica',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent extends HandlerBase implements OnInit {

  @ViewChildren("pointsInput") inputs?: QueryList<ElementRef<HTMLInputElement>>;

  grouped: IGiocatore[][] = [];

  ngOnInit(): void {

    if (!this.payload.giocatori.length) this.onEditPlayers();

    else {

      this.onRefreshPositions();
      this.setGroupedPlayers();
    }
  }

  /**
   * Modifica o crea la lista di giocatori/squadre.
   */
  onEditPlayers() {

    let giocatori: string | null;

    const promptGiocatori = this.payload.giocatori?.length
      ? this.payload.giocatori.map(g => g.name).join(", ")  // Edit della lista
      : "Roberta, Daniele S., Daniele L., Giorgia";         // Nuova lista

    do giocatori = prompt("Inserisci i nomi dei giocatori o delle squadre.\nSe un nome viene scritto più volte verrà inserito una volta sola.\n(Assicurati di separare ogni nome utilizzando la virgola)", promptGiocatori);
    while (giocatori === "");

    if (giocatori) {

      let lista: string[] = [];

      giocatori.split(",").map(g => g.trim().toUpperCase()).forEach(g => {

        if (g?.length) {

          const nome = g.split(" ").filter(l => l !== "").join(" ");

          // Evita nomi multipli
          if (!lista.includes(nome)) lista.push(nome);
        }
      });

      // Edit della lista; serve a rimuovere i nomi
      if (this.payload.giocatori?.length) {

        const nomi = this.payload.giocatori.map(g => g.name);

        nomi.forEach(n => {

          if (!lista.includes(n)) {

            const index = this.payload.giocatori.findIndex(g => g.name === n);
            this.payload.giocatori.splice(index, 1);
          }
        });
      }

      lista.forEach(nome => {

        if (!this.payload.giocatori.find(p => p.name === nome)) {

          this.payload.giocatori.push({ name: nome, points: 0 });
        }
      });

      this.setGroupedPlayers();
      this.forceFocusout(this.inputs);
    }
  }

  /**
   * Aggiorna le posizioni dei giocatori o squadre in base ai loro punteggi.
   */
  onRefreshPositions() {

    this.refreshPoints();

    this.payload.giocatori.sort((a, b) => b.points - a.points);

    this.setGroupedPlayers();
    this.forceFocusout(this.inputs);
  }

  /**
   * Se i punti di alcuni giocatori o squadre risultano null vengono riportati a 0.
   */
  refreshPoints() {

    this.payload.giocatori.forEach(g => g.points ??= 0);
  }

  /**
   * Esegue il metodo slice sull'array di giocatori e ne restituisce gli elementi.
   */
  slice(start: number, end?: number) {

    return this.payload.giocatori.slice(start, end);
  }

  /**
   * Imposta l'array grouped di giocatori/squadre.
   */
  setGroupedPlayers() {

    const rest = this.payload.giocatori.slice(3);

    let giocatori: IGiocatore[][] = [];

    if (rest?.length) {

      let length = rest.length;

      do {
        length -= 4;
        giocatori.push(rest.slice(0, 4));
        rest.splice(0, 4);
      }
      while (length > 0);
    }

    this.grouped = giocatori;
  }

  override classificationHandler() {

    if (!this.payload.showHelp) {

      if (this.code === "KeyR") this.onRefreshPositions();
      if (this.code === "KeyE") this.onEditPlayers();
    }
  }
}
