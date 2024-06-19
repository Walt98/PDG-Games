import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { PayloadService } from './payload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    PassaParolaComponent,
    FourImagesOneWordComponent
  ]
})
export class AppComponent {

  title = 'pdg-games';

  cards = [
    "Passa-Parola di Dio",
    "4 Immagini 1 Parola di Dio"
  ];

  constructor(public payload: PayloadService) { }

  /**
   * Restituisce lo stile background-image della singola card. 
   */
  getCardImage(index: number) {

    return `background-image: url("/card${index + 1}.jpg")`;
  }

  /**
   * Chiude il gioco.
   */
  onClose() {

    if (this.payload.gioco > -1) this.payload.gioco = -1;
  }
}
