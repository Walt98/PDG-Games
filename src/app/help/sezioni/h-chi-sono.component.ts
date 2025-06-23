import { Component } from '@angular/core';

@Component({
  selector: 'app-h-chi-sono',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <h5 class="help-title"> Come si gioca </h5>
        In ogni round verrà mostrato l'anagramma di una parola e l'obiettivo del gioco è capire qual è tale parola prima della scadenza del timer.
        <br>
        <br>

        <h5 class="help-title"> Ordinare la parola </h5>
        Con il pulsante <b>Invio</b> si potrà ordinare la parola, indicando che è stata indovinata, e il timer si fermerà; con il pulsante <b>Backspace</b> succederà la stessa cosa ma la risposta sarà sbagliata.
        <br>
        È anche possibile ordinarla cliccando sul logo PDG YNG.
        <br>
        <br>

        <h5 class="help-title"> Cambiare round </h5>
        Solo quando la parola verrà mostrata correttamente sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG. Ma nel caso in cui si volesse forzare un cambio round, a prescindere se la parola è stata ordinata o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b> (non è possibile forzare un cambio round né spostarsi a quelli precedenti cliccando sul logo).
        <br>
        <br>

        <h5 class="help-title"> Timer </h5>
        Per poter avviare il timer basta premere la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure indovinando/sbagliando la parola.
        <br>
        È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
      </section>
    </div>
  `
})
export class HChiSonoComponent { }
