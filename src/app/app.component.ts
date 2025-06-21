import { Component, HostListener } from '@angular/core';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { PayloadService } from './payload.service';
import { ListaGiochiComponent } from './lista-giochi/lista-giochi.component';
import { CompletaIlVersoComponent } from './completa-il-verso/completa-il-verso.component';
import { IntroComponent } from './intro/intro.component';
import { CommonModule } from '@angular/common';
import { ChiSonoComponent } from './chi-sono/chi-sono.component';
import { ReazioneACatenaComponent } from './reazione-a-catena/reazione-a-catena.component';
import { ImpiccatoComponent } from "./impiccato/impiccato.component";
import { ClassificaComponent } from './classifica/classifica.component';
import { HelpComponent } from './help/help.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    IntroComponent,
    HelpComponent,
    ClassificaComponent,
    ListaGiochiComponent,
    PassaParolaComponent,
    FourImagesOneWordComponent,
    ChiSonoComponent,
    CompletaIlVersoComponent,
    ReazioneACatenaComponent,
    ImpiccatoComponent
]
})
export class AppComponent {

  title = "pdg-games";
  showIntroComponent = true;

  constructor(public payload: PayloadService) { }

  /**
   * Chiude il gioco.
   */
  onClose() {

    this.payload.gioco = -1;
    this.payload.stopTimer$.next();
  }

  /**
   * Mostra o nasconde la classifica.
   */
  onShowClassification() {

    this.payload.showClassification = !this.payload.showClassification;

    setTimeout(() => {

      if (!this.payload.giocatori.length) {

        this.payload.showClassification = false;
      }
    });
  }

  /**
   * Mostra o nasconde la sezione di aiuto.
   */
  onShowHelp() {

    this.payload.showHelp = !this.payload.showHelp;
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      if (event.code === "KeyX" && (event.ctrlKey || event.metaKey)) {

        this.payload.gioco = -1;
      }
    }

    if (event.code === "KeyC" && event.altKey && !this.showIntroComponent) {

      if (!this.payload.showHelp) this.onShowClassification();
    }

    if (event.code === "KeyH" && event.altKey && !this.showIntroComponent) {

      this.onShowHelp();
    }
  }
}
