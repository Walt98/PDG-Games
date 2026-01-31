import { Component } from '@angular/core';

@Component({
  selector: 'app-h-guess-logo',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center">
        <h5> Come si gioca </h5>
        In ogni round verrà mostrato un logo senza nome; l'obiettivo del gioco è capire qual è. Avrai a disposizione tre tentativi per ogni round.
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
            <h5> Mostrare/nascondere il nome </h5>
            Con il pulsante <b>Invio</b> si potrà mostrare il nome del logo; se si volesse nasconderlo nuovamente basterà premere il pulsante <b>Backspace</b>. Se il giocatore non indovina entro i tre tentativi il nome verrà mostrato automaticamente.
            <br>
            È anche possibile mostrarlo cliccando sul logo PDG YNG, ma ciò non permette anche di nasconderlo.
            <br>

            <h5> Cambiare round </h5>
            Solo quando il nome verrà mostrato sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG. Ma nel caso in cui si volesse forzare un cambio round, a prescindere se il nome è stata mostrato o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b> (non è possibile forzare un cambio round né spostarsi a quelli precedenti cliccando sul logo).
          </div>
        </div>
      </section>
    </div>
  `
})
export class HGuessLogoComponent {
  
  click = false;
}
