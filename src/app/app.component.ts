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

    if (!this.payload.showHelp) {

      this.payload.gioco = -1;
      this.payload.stopTimer$.next();
    }
  }

  /**
   * Mostra o nasconde la classifica.
   */
  onShowClassification() {

    if (!this.payload.showHelp) {

      this.payload.showClassification = !this.payload.showClassification;
      this.payload.stopTimer$.next();

      setTimeout(() => {

        if (!this.payload.giocatori.length) {

          this.payload.showClassification = false;
        }

        this.forceFocusout();
      });
    }
  }

  /**
   * Mostra o nasconde la sezione di aiuto.
   */
  onShowHelp() {

    this.payload.showHelp = !this.payload.showHelp;
    this.payload.stopTimer$.next();
    this.forceFocusout();
  }

  /**
   * Forza il focusout dai bottoni classifica e aiuto.
   */
  forceFocusout() {

    this.buttons?.forEach(i => i.nativeElement.blur());
  }

  /**
   * Mostra/nasconde la classifica e/o la sezione di aiuto.
   * @param code Nome pulsante
   * @param ctrlKey Se Ctrl/Cmd è stato premuto
   * @param altKey Se Alt/Option è stato premuto
   */
  onShowH_C(code: string, ctrlKey: boolean, altKey: boolean) {

    // Condizione chiusura gioco
    const game = code === "KeyX" && ctrlKey && this.payload.gioco > -1;

    // Condizione Classifica
    const classifica = !this.showIntroComponent && !this.payload.showHelp &&
      ((code === "KeyC" && altKey) ||
      (code === "Escape" && this.payload.showClassification));

    // Condizione Help
    const help = !this.showIntroComponent &&
      ((code === "KeyH" && altKey) ||
      (code === "Escape" && this.payload.showHelp));

    if (classifica) this.onShowClassification();

    else {

      if (help) this.onShowHelp();
    }

    if (game) {

      if (this.payload.showHelp) this.onShowHelp();
      if (this.payload.showClassification) this.onShowClassification();
    }
  }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event"]) onKeydown(event: KeyboardEvent) {

    this.onShowH_C(event.code, event.ctrlKey || event.metaKey, event.altKey);

    if (["ArrowLeft", "ArrowRight"].includes(event.code)) {

      this.forceFocusout();
    }

    if (event.code === "KeyX" && (event.ctrlKey || event.metaKey)) {

      this.payload.gioco = -1;
    }
  }
}
