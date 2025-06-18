import { Component, HostListener, OnInit } from '@angular/core';
import { PayloadService } from '../payload.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-classifica',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './classifica.component.html',
  styleUrl: './classifica.component.scss'
})
export class ClassificaComponent implements OnInit {

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    if (!this.payload.giocatori.length) {

      let giocatori: string | null;
      
      do {
        giocatori = prompt("Inserisci i nomi dei giocatori o delle squadre.\n(Assicurati di separare ogni nome utilizzando la virgola)", "Roberta, Daniele S., Daniele L., Giorgia");
      }
      while (giocatori === "");

      if (giocatori) {

        giocatori.split(",").map(g => g.trim().toUpperCase()).forEach(g => {

          if (g?.length) {

            const trimmed = g.split(" ").filter(l => l !== "").join(" ");

            this.payload.giocatori.push({ name: trimmed, points: 0 });
          }
        });
      }
    }
  }

  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (code === "Escape") this.payload.showClassification = false;
  }
}
