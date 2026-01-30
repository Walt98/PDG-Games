import { Component } from '@angular/core';

@Component({
  selector: 'app-h-passa-parola',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center">
        <h5> Come si gioca </h5>
        Ogni lettera del cerchio indica l'iniziale della parola a cui si riferisce e l'obiettivo del gioco è riuscire a indovinare quante più parole possibili in base agli indizi dati, prima che scada il timer. Se sul momento non si riesce a capire qual è la parola corretta è possibile "passare" alla successiva, per poi riprenderla in un secondo momento; ma se viene data la parola sbagliata essa non potrà essere più indovinata.
        <br>
        Il colore della lettera indica lo stato in cui si trova: blu, lettera neutra; giallo, lettera "passata"; verde, lettera indovinata; rosso, lettera sbagliata.
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
            <h5> Muoversi tra le lettere </h5>
            Ci sono due modi per spostarsi su una lettera: utilizzando le <b>frecce sinistra e destra</b> oppure cliccando sulla <b>lettera corrispondente sulla tastiera</b>.
            <br>
            Premendo <b>Esc</b> si perderà il focus sulla lettera, ma se si riprende a utilizzare le frecce si ripartirà dalla stessa.
            <br>
            Non è possibile muoversi sulle lettere in verde e in rosso utilizzando le frecce, ma si può forzare l'accesso utilizzando la lettera corrispondente sulla tastiera.
            <br>

            <h5> Modifica dello stato </h5>
            Una volta posizionati su una lettera si possono utilizzare degli shortcut per modificarne lo stato: <b>Invio</b> se è corretta; <b>Backspace</b> se è sbagliata; <b>Shift</b> se è "passata"; <b>Canc</b> (<b>Cmd + Backspace</b> su Mac) per riportarla a neutra.
            <br>
            È anche possibile modificare lo stato cliccando più volte direttamente sulla lettera, finché essa non avrà quello desiderato.
            <br>

            <h5> Timer </h5>
            Per poter avviare il timer basta premere la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure completando il gioco.
            <br>
            È anche possibile modificarne la durata utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> si modificherà di 10 secondi per volta; per quest'ultimo caso, se hai il focus su una lettera assicurati prima di rimuoverlo premendo <b>Esc</b>, perché altrimenti modificherai ne modificherai lo stato.
          </div>
        </div>
      </section>
    </div>
  `
})
export class HPassaParolaComponent {
  
  click = false;
}
