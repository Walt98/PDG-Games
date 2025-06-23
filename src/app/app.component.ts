import { Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
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

  @ViewChildren("classificationHelp") buttons?: QueryList<ElementRef<HTMLButtonElement>>;

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

      this.forceFocusout();
    });
  }

  /**
   * Mostra o nasconde la sezione di aiuto.
   */
  onShowHelp() {

    this.payload.showHelp = !this.payload.showHelp;
    this.forceFocusout();
  }

  /**
   * Forza il focusout dai bottoni classifica e aiuto.
   */
  forceFocusout() {

    this.buttons?.forEach(i => i.nativeElement.blur());
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    if (event.code === "KeyX" && (event.ctrlKey || event.metaKey)) {

      if (this.payload.gioco > -1) {

        if (this.payload.showClassification) this.payload.showClassification = false;
        if (this.payload.showHelp) this.payload.showHelp = false;
      }

      this.payload.gioco = -1;
    }

    if (event.code === "KeyC" && event.altKey && !this.showIntroComponent) {

      if (!this.payload.showHelp) {

        this.onShowClassification();
        this.forceFocusout();
      }
    }

    if (event.code === "KeyH" && event.altKey && !this.showIntroComponent) {

      this.onShowHelp();
      this.forceFocusout();
    }

    if (["ArrowLeft", "ArrowRight"].includes(event.code)) {

      this.forceFocusout();
    }
  }
}
