import { Component } from '@angular/core';

@Component({
  selector: 'app-h-reazione-a-catena',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center help-text">
        <b>QUESTO GIOCO VA GIOCATO IN SQUADRE DA TRE PERSONE.</b>
        <br>
        <br>
        <h5 class="help-title"> Come si gioca </h5>
        In ogni round verrà mostrata una parola a due persone della squadra e l'obiettivo del gioco è far capire al terzo giocatore quante più parole possibili prima della scadenza del timer. Per ogni parola indovinata verrà assegnato un punto, e di conseguenza se ne perderà uno per ogni risposta sbagliata.
        <br>
        I due giocatori che vedono la parola non possono dirla, né dirne di simili (esempio: la parola da far indovinare è "Pallone" e uno dei due dice "Palla"); inoltre i due potranno dire una sola parola per volta. Se queste condizioni non vengono rispettate la squadra perderà un punto e passerà alla parola successiva.
        <br>
        La squadra può avere a disposizione dei "Passo", a discrezione del conduttore del gioco, che gli permetterà di saltare quella parola senza perdere alcun punto.
        <br>
        <br>

        <h5 class="help-title"> Aggiungere/rimuovere punti </h5>
        Per aggiungere un punto basta premere il pulsante <b>Invio</b>; per toglierne uno si usa il pulsante <b>Backspace</b>. Per evitare che si senta il suono dei punti aggiunti/rimossi basta usare anche il pulsante <b>Shift</b>.
        <br>
        <br>

        <h5 class="help-title"> Cambiare round </h5>
        È possibile cambiare parola usando le <b>frecce sinistra e destra</b>, oppure cliccando sul logo PDG YNG.
        <br>
        <br>

        <h5 class="help-title"> Timer </h5>
        Il timer partirà in automatico se si usano le frecce per cambiare parola, ma è anche possibile avviarlo manualmente premendo la <b>Barra spaziatrice</b>, oppure cliccando sul timer stesso; per fermarlo basta ripetere una delle due azioni precedentemente indicate, oppure indovinando/sbagliando la parola.
        <br>
        È anche possibile aggiungere/rimuovere secondi utilizzando le <b>frecce su e giù</b>, ma usando anche il tasto <b>Shift</b> se ne potranno aggiungere/rimuovere 10 per volta.
      </section>
    </div>
  `
})
export class HReazioneACatenaComponent { }
