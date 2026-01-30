import { Component, OnInit } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import data from '../../../public/game3items.json';
import { CommonModule } from '@angular/common';
import { HandlerBase } from '../handler-base.directive';

declare type RispostaItem = { text: string; isCurrect?: boolean; status?: "success" | "error" };
declare type CompletaIlVersoItem = { verso: string; risposte: RispostaItem[]; };

@Component({
  selector: 'app-completa-il-verso',
  standalone: true,
  imports: [TimerComponent, CommonModule],
  templateUrl: './completa-il-verso.component.html',
  styleUrl: './completa-il-verso.component.scss'
})
export class CompletaIlVersoComponent extends HandlerBase implements OnInit {

  index = 0;
  items = JSON.parse(JSON.stringify(data)) as CompletaIlVersoItem[];

  ngOnInit(): void {
    
    this.setItems();
  }

  /**
   * Imposta domande e risposte in maiuscolo.
   */
  private setItems() {

    let items: CompletaIlVersoItem[] = [];

    this.items.forEach(i => items.push({
      verso: i.verso.toUpperCase(),
      risposte: [
        { text: "A — " + i.risposte[0].text.toUpperCase(), isCurrect: i.risposte[0]?.isCurrect },
        { text: "B — " + i.risposte[1].text.toUpperCase(), isCurrect: i.risposte[1]?.isCurrect },
        { text: "C — " + i.risposte[2].text.toUpperCase(), isCurrect: i.risposte[2]?.isCurrect },
        { text: "D — " + i.risposte[3].text.toUpperCase(), isCurrect: i.risposte[3]?.isCurrect }
      ]
    }));

    this.items = items;
  }

  /**
   * Evento click del logo.
   * 
   * Va avanti con le domande.
   */
  change() {

    if (this.index !== this.items.length - 1) {

      let risposta = this.items[this.index].risposte.find(r => r.isCurrect);

      if (risposta?.status) {

        this.restartTimer();
        this.index++;
      }
    }
  }

  /**
   * Evento timeout del timer.
   */
  onTimeout() {

    this.timerRxJS(3000, () => {
      let risposta = this.items[this.index].risposte.find(r => r.isCurrect);
      if (risposta) risposta.status = "success";
    });
  }

  /**
   * Evento click delle risposte.
   */
  onSelect(risposta: RispostaItem) {
    
    const i = this.items[this.index].risposte.indexOf(risposta);
    const status = risposta.isCurrect ? "success" : "error";

    this.items[this.index].risposte[i].status = status;
    this.play(status);

    this.payload.stopTimer$.next();

    if (status === "error") {

      let currect = this.items[this.index].risposte.find(r => !!r?.isCurrect);
      if (currect) currect.status = "success";
    }
  }

  override completaIlVersoHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      // Va avanti
      if (this.code === "ArrowRight") {

        let risposta = this.items[this.index].risposte.find(r => r.isCurrect);

        if (this.index < this.items.length - 1 && (risposta?.status || this.shiftKey)) {

          this.restartTimer();
          this.index++;
        }
      }

      // Va indietro
      if (this.code === "ArrowLeft") {

        let risposta = this.items[this.index].risposte.find(r => r.isCurrect);

        if (this.index > 0 && (risposta?.status || this.shiftKey)) {

          this.restartTimer();
          this.index--;
        }
      }

      // Seleziona la risposta
      if (["KeyA", "KeyB", "KeyC", "KeyD"].includes(this.code) && !this.altKey) {

        let index = -1;

        switch (this.code) {
          case "KeyA": index = 0; break;
          case "KeyB": index = 1; break;
          case "KeyC": index = 2; break;
          case "KeyD": index = 3; break;
          default: index = -1; break;
        }

        if (index > -1) this.onSelect(this.items[this.index].risposte[index]);
      }
    }
  }
}
