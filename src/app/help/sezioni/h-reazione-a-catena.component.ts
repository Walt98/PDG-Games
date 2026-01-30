import { Component } from '@angular/core';

@Component({
  selector: 'app-h-reazione-a-catena',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center">
        <h5> Come si gioca </h5>
        <b>GIOCO A SQUADRE DA TRE PERSONE.</b>
        <br>
        In ogni round verrà mostrata una parola a due persone della squadra e l'obiettivo del gioco è far capire al terzo giocatore quante più parole possibili prima della scadenza del timer. Per ogni parola indovinata verrà assegnato un punto, e di conseguenza se ne perderà uno per ogni risposta sbagliata.
        <br>
        I due giocatori che vedono la parola non possono dirla, né dirne di simili (esempio: la parola da far indovinare è "Pallone" e uno dei due dice "Palla"); inoltre i due potranno dire una sola parola per volta. Se queste condizioni non vengono rispettate la squadra perderà un punto e passerà alla parola successiva.
        <br>
        La squadra può avere a disposizione dei "Passo", a discrezione del conduttore del gioco, che gli permetterà di saltare quella parola senza perdere alcun punto.
        <br>

        <button class="btn btn-outline-warning altro-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse" aria-expanded="false" aria-controls="collapse" (click)="click = !click">
          <span class="d-flex align-items-center justify-content-center">
            Altro
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-circle arrow {{ click ? 'clicked' : '' }}" viewBox="-2 -2 20 20">
              <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" stroke="#ffc107" stroke-width="1"/>
            </svg>
          </span>
        </button>
        <br>

        <div class="collapse" id="collapse">
          <div class="card card-body">
            <h5> Aggiungere/rimuovere punti </h5>
            Per aggiungere un punto basta premere il pulsante <b>Invio</b>; per toglierne uno si usa il pulsante <b>Backspace</b>. Per evitare che si senta il suono dei punti aggiunti/rimossi basta usare anche il pulsante <b>Shift</b>.
            <br>

            <h5> Cambiare round </h5>
            È possibile cambiare parola usando le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG.
            <br>

            <h5> Timer </h5>
            Il timer partirà in automatico se si usano le frecce per cambiare parola, ma è anche possibile avviarlo manualmente premendo la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure indovinando/sbagliando la parola.
            <br>
            È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
          </div>
        </div>
      </section>
    </div>
  `
})
export class HReazioneACatenaComponent {
  
  click = false;
}
