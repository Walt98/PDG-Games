import { Component } from '@angular/core';

@Component({
  selector: 'app-h-impiccato',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <h5 class="help-title"> Come si gioca </h5>
        In ogni round verrà mostrato il luogo di esecuzione di un poveruomo che sta per essere impiccato e l'obiettivo del gioco è salvarlo indovinando qual è la parola nascosta. Ognuno dei giocatori può dire una lettera per volta: se il giocatore dice una lettera contenuta nella parola da indovinare, essa comparirà al suo corretto posto; se è presente più volte, tutte le sue occorrenze verranno mostrate. Se il giocatore ne dice una che è presente nella parola potrà continuare a dirne delle altre, ma sbagliando si passerà al giocatore successivo e apparirà una parte dell'impiccato; sbagliando 6 volte lui morirà. Il giocatore può anche decidere di non dire alcuna lettera ma di provare a indovinare la parola; se sbaglia si passerà al giocatore successivo, ma non appariranno nuove parti del corpo dell'impiccato.
        <br>
        <br>

        <h5 class="help-title"> Mostrare le lettere </h5>
        Premettendo che tutti i numeri e i simboli della parola saranno già visibili all'inizio del round, per far apparire le lettere (o una parte dell'impiccato) basta premere la <b>lettera corrispondente sulla tastiera</b>. Per mostrare l'intera parola basta usare il tasto <b>Invio</b>.
        <br>
        <br>

        <h5 class="help-title"> Rimuovere parti dell'impiccato </h5>
        È anche possibile rimuovere parti del corpo dell'impiccato usando il tasto <b>Backspace</b>.
        <br>
        <br>

        <h5 class="help-title"> Cambiare round </h5>
        Solo quando la parola verrà mostrata sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>. Ma nel caso in cui si volesse forzare un cambio round, a prescindere se la parola è stata indovinata o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b>.
      </section>
    </div>
  `
})
export class HImpiccatoComponent { }
