import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { PayloadService } from './payload.service';
import { ListaGiochiComponent } from './lista-giochi/lista-giochi.component';
import { CompletaIlVersoComponent } from './completa-il-verso/completa-il-verso.component';
import { IntroComponent } from './intro/intro.component';
import { CommonModule } from '@angular/common';
import { ChiSonoComponent } from './chi-sono/chi-sono.component';
import { ReazioneACatenaComponent } from './reazione-a-catena/reazione-a-catena.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    IntroComponent,
    ListaGiochiComponent,
    PassaParolaComponent,
    FourImagesOneWordComponent,
    ChiSonoComponent,
    CompletaIlVersoComponent,
    ReazioneACatenaComponent
  ]
})
export class AppComponent {

  title = 'pdg-games';
  showIntroComponent = true;

  constructor(public payload: PayloadService) { }

  /**
   * Chiude il gioco.
   */
  onClose() {

    this.payload.gioco = -1;
    this.payload.stopTimer$.next();
  }
}
