import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayloadService {

  /** Array delle classi dei giochi. */
  public giochi!: any[];

  /** Rappresenta il codice del gioco. */
  public gioco!: number;

  constructor() { }
}
