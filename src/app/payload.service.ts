import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  /** Rappresenta il codice del gioco. */
  public gioco = -1;

  /** Subscription del timer. */
  public timerSubscription!: Subscription;

  /** Subject da usare per far partire il timer "in remoto". */
  public startTimer$ = new Subject<void>();

  /** Subject da usare per fermare il timer "in remoto". */
  public stopTimer$ = new Subject<void>();

  constructor() { }
}
