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
        <br>

        <h5 class="help-title"> Scelta della risposta </h5>
        Le risposte possibili sono sempre 4, dalla A alla D, e per sceglierne una basta cliccare su di essa, oppure cliccando sulla <b>lettera corrispondente sulla tastiera</b>.
        <br>
        <br>

        <h5 class="help-title"> Cambiare round </h5>
        Solo quando verrà data una risposta sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG (sempre dopo aver risposto). Ma nel caso in cui si volesse forzare un cambio round, a prescindere se è stata data una risposta o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b> (non è possibile forzare un cambio round né spostarsi a quelli precedenti cliccando sul logo).
        <br>
        <br>

        <h5 class="help-title"> Timer </h5>
        Per poter avviare il timer basta premere la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure dando una risposta.
        <br>
        È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
      </section>
    </div>
  `
})
export class HCompletaIlVersoComponent { }
