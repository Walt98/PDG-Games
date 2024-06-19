import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { PayloadService } from './payload.service';

/**
 * Classi dei giochi da importare.
 */
const GAMES_IMPORTS: any[] = [
  PassaParolaComponent,
  FourImagesOneWordComponent
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [RouterOutlet, ...GAMES_IMPORTS]
})
export class AppComponent implements OnInit {

  title = 'pdg-games';

  cards = [
    "Passa-Parola di Dio",
    "4 Immagini 1 Parola di Dio"
  ];

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.payload.giochi = GAMES_IMPORTS;
  }

  /**
   * Restituisce lo stile background-image della singola card. 
   */
  getCardImage(index: number) {

    return `background-image: url("/card${index + 1}.jpg")`;
  }
}
