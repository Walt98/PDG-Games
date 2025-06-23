import { Component } from '@angular/core';

@Component({
  selector: 'app-h-lista-giochi',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <b>IL SITO NON È STATO IDEATO E IMPLEMENTATO PER ESSERE USATO DA SMARTPHONE E TABLET.</b>
        <br>
        <br>

        <h5 class="help-title"> START! veloce </h5>
        Quando si carica il sito compare un pulsante START! che, dopo un breve video di intro, fa iniziare l'esperienza di gioco; ma è anche possibile saltare il video tramite lo shortcut <b>Shift + Invio</b>.
        <br>
        <br>

        <h5 class="help-title"> Scelta gioco tramite tastiera </h5>
        La tastiera può anche essere usata per muoversi tra i giochi utilizzando le <b>frecce sinistra e destra</b>; premendo <b>Esc</b> si perderà il focus sul gioco, ma se si riprende a utilizzare le frecce si ripartirà dallo stesso; premendo <b>Invio</b> quando ci si è posizionati su uno dei giochi esso si avvierà.
        <br>
        <br>

        <h5 class="help-title"> Chiusura giochi </h5>
        Quando si apre un qualsiasi gioco comparirà una X in alto a destra; per uscire dal gioco basta cliccarla, oppure utilizzare lo shortcut <b>Ctrl + X</b> (<b>Cmd + X</b> su Mac).
        <br>
        <br>

        <h5 class="help-title"> Classifica e sezione di aiuto </h5>
        Una volta completato lo START! compariranno due pulsanti in alto e in basso a sinistra che, se cliccati, faranno apparire rispettivamente la classifica e la sezione di aiuto (quella in cui ci troviamo adesso); ma esse si possono aprire anche tramite gli shortcut <b>Alt + C</b> e <b>Alt + H</b> (<b>Option + C</b> e <b>Option + H</b> su Mac). È possibile chiudere le due sezioni cliccando nuovamente sui rispettivi pulsanti, oppure usando gli shortcut assegnati, o ancora prendendo <b>Esc</b>. 
        <br>
        Le due sezioni si potranno aprire in qualunque momento, ma non è possibile consultare la classifica se la sezione di aiuto è ancora aperta; viceversa, se viene aperta prima la classifica sarà possibile consultare la sezione di aiuto, perché ogni pagina aperta, che sia la home, la classifica o uno dei giochi, mostrerà sempre una sezione di aiuto diversa.
        <br>
        Se una delle due sezioni viene aperta durante un gioco e viene usato lo shortcut <b>Ctrl + X</b> (<b>Cmd + X</b> su Mac) verrà chiusa sia la sezione aperta che il gioco.
      </section>
    </div>
  `
})
export class HListaGiochiComponent { }
