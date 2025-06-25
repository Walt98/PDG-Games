import { Component } from '@angular/core';

@Component({
  selector: 'app-h-completa-il-verso',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <h5 class="help-title"> Come si gioca </h5>
        In ogni round viene mostrato un versetto incompleto della Bibbia con 4 possibili risposte e l'obiettivo del gioco è riuscire a capire qual è quella giusta, che si illuminerà di verde, prima della scadenza del timer; se viene data la risposta sbagliata essa diventerà rossa e verrà mostrata qual è quella corretta.
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
            <h5 class="help-title"> Scelta della risposta </h5>
            Le risposte possibili sono sempre 4, dalla A alla D, e per sceglierne una basta cliccare su di essa, oppure cliccando sulla <b>lettera corrispondente sulla tastiera</b>.
            <br>

            <h5 class="help-title"> Cambiare round </h5>
            Solo quando verrà data una risposta sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG (sempre dopo aver risposto). Ma nel caso in cui si volesse forzare un cambio round, a prescindere se è stata data una risposta o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b> (non è possibile forzare un cambio round né spostarsi a quelli precedenti cliccando sul logo).
            <br>

            <h5 class="help-title"> Timer </h5>
            Per poter avviare il timer basta premere la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure dando una risposta.
            <br>
            È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
          </div>
        </div>
      </section>
    </div>
  `
})
export class HCompletaIlVersoComponent {
  
  click = false;
}
