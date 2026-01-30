import { Component } from '@angular/core';

@Component({
  selector: 'app-h-impiccato',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center">
        <h5> Come si gioca </h5>
        In ogni round verrà mostrato il luogo di esecuzione di un poveruomo che sta per essere impiccato e l'obiettivo del gioco è salvarlo indovinando qual è la parola nascosta. Ognuno dei giocatori può dire una lettera per volta: se il giocatore dice una lettera contenuta nella parola da indovinare, essa comparirà al suo corretto posto; se è presente più volte, tutte le sue occorrenze verranno mostrate. Se il giocatore ne dice una che è presente nella parola potrà continuare a dirne delle altre, ma sbagliando si passerà al giocatore successivo e apparirà una parte dell'impiccato; sbagliando 6 volte lui morirà. Il giocatore può anche decidere di non dire alcuna lettera ma di provare a indovinare la parola; se sbaglia si passerà al giocatore successivo, ma non appariranno nuove parti del corpo dell'impiccato.
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
            <h5> Mostrare le lettere </h5>
            Premettendo che tutti i numeri e i simboli della parola saranno già visibili all'inizio del round, per far apparire le lettere (o una parte dell'impiccato) basta premere la <b>lettera corrispondente sulla tastiera</b>. Per mostrare l'intera parola basta usare il tasto <b>Invio</b>.
            <br>

            <h5> Rimuovere parti dell'impiccato </h5>
            È anche possibile rimuovere parti del corpo dell'impiccato usando il tasto <b>Backspace</b>.
            <br>

            <h5> Cambiare round </h5>
            Solo quando la parola verrà mostrata sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>. Ma nel caso in cui si volesse forzare un cambio round, a prescindere se la parola è stata indovinata o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b>.
          </div>
        </div>
      </section>
    </div>
  `
})
export class HImpiccatoComponent {
  
  click = false;
}
