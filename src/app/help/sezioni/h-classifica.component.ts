import { Component } from '@angular/core';

@Component({
  selector: 'app-h-classifica',
  standalone: true,
  template: `
    <div class="d-flex justify-content-center">
      <section class="text-center">
        <h5> Modifica dei punteggi </h5>
        Quando si carica il sito e si apre per la prima volta la classifica verrà chiesto di indicare i nomi di tutti i partecipanti; una volta scelti, i loro punti potranno essere modificati cliccando sullo spazio tra il nome e la linea tratteggiata, oppure sul nome stesso o ancora sul numero che indica la sua posizione in classifica.
        <br>

        <h5> Aggiornamento delle posizioni </h5>
        Assegnati i punti, per poter ordinare tutti i partecipanti in base al punteggio maggiore basterà cliccare sul pulsante blu in basso, oppure tramite il tasto <b>R</b>.
        <br>

        <h5> Aggiornamento dei partecipanti </h5>
        È possibile modificare la lista dei partecipanti, anche dopo averla scelta all'inizio, cliccando sul pulsante rosso, oppure tramite il tasto <b>E</b>.
        <br>
        Attenzione! Se si modifica il nome di uno di quelli già esistenti esso verrà considerato un nuovo partecipante, perciò il suo punteggio verrà riportato a 0.
      </section>
    </div>
  `
})
export class HClassificaComponent { }
