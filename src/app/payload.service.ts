import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  /** Rappresenta il codice del gioco. */
  public gioco!: number;

  constructor() { }
}
