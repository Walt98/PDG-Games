import { Component } from '@angular/core';

@Component({
  selector: 'app-h-four-images-one-word',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <h5 class="help-title"> Come si gioca </h5>
        Per ogni round vengono mostrate 4 immagini e l'obiettivo del gioco è indovinare qual è la parola che le accomuna tutte entro la fine del timer.
        <br>
        <br>

        <h5 class="help-title"> Mostrare/nascondere la parola </h5>
        Con il pulsante <b>Invio</b> si potrà mostrare la parola e il timer si fermerà; se si volesse nasconderla nuovamente basterà premere il pulsante <b>Backspace</b>. Se il tempo scade essa verrà automaticamente mostrata.
        <br>
        È anche possibile mostrare la parola cliccando sul logo PDG YNG ma ciò non permette anche di nasconderla.
        <br>
        <br>

        <h5 class="help-title"> Cambiare round </h5>
        Solo quando la parola verrà mostrata sarà possibile cambiare round; per farlo basta usare le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG. Ma nel caso in cui si volesse forzare un cambio round, a prescindere se la parola è stata mostrata o meno, sarà possibile farlo utilizzando le frecce e il tasto <b>Shift</b> (non è possibile forzare un cambio round né spostarsi a quelli precedenti cliccando sul logo).
        <br>
        <br>

        <h5 class="help-title"> Timer </h5>
        Per poter avviare il timer basta premere la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure indovinando la parola.
        <br>
        È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
      </section>
    </div>
  `
})
export class HFourImagesOneWordComponent { }
