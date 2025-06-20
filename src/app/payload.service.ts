import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IGiocatore } from './giocatore';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  /** Rappresenta il codice del gioco. */
  public gioco = -1;

  /** Giocatori o squadre della classifica. */
  public giocatori: IGiocatore[] = [];

  /** Mostra o nasconde la classifica. */
  public showClassification = false;

  /** Mostra o nasconde la sezione di aiuto. */
  public showHelp = false;

  /** Subscription del timer. */
  public timerSubscription!: Subscription;

  /** Subject da usare per far partire il timer "in remoto". */
  public startTimer$ = new Subject<void>();

  /** Subject da usare per fermare il timer "in remoto". */
  public stopTimer$ = new Subject<void>();

  constructor() { }
}
