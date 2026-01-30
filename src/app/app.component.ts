import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FourImagesOneWordComponent } from './four-images-one-word/four-images-one-word.component';
import { PassaParolaComponent } from './passa-parola/passa-parola.component';
import { ListaGiochiComponent } from './lista-giochi/lista-giochi.component';
import { CompletaIlVersoComponent } from './completa-il-verso/completa-il-verso.component';
import { IntroComponent } from './intro/intro.component';
import { CommonModule } from '@angular/common';
import { ChiSonoComponent } from './chi-sono/chi-sono.component';
import { ReazioneACatenaComponent } from './reazione-a-catena/reazione-a-catena.component';
import { ImpiccatoComponent } from "./impiccato/impiccato.component";
import { ClassificaComponent } from './classifica/classifica.component';
import { HelpComponent } from './help/help.component';
import { GuessLogoComponent } from './guess-logo/guess-logo.component';
import { HandlerBase } from './handler-base.directive';

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
    ImpiccatoComponent,
    GuessLogoComponent
]
})
export class AppComponent extends HandlerBase {

  @ViewChildren("classificationHelp") buttons?: QueryList<ElementRef<HTMLButtonElement>>;

  title = "pdg-games";

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

      this.timerRxJS(0, () => {

        if (!this.payload.giocatori.length) {
          this.payload.showClassification = false;
        }

        this.forceFocusout(this.buttons);
      });
    }
  }

  /**
   * Mostra o nasconde la sezione di aiuto.
   */
  onShowHelp() {

    this.payload.showHelp = !this.payload.showHelp;
    this.payload.stopTimer$.next();
    this.forceFocusout(this.buttons);
  }

  /**
   * Mostra/nasconde la sezione di aiuto o la classifica.
   */
  onShowHelpClassification() {

    const ctrlKey = this.ctrlKey || this.metaKey;

    // Condizione chiusura gioco
    const game = this.code === "KeyX" && ctrlKey && this.payload.gioco > -1;

    // Condizione Classifica
    const classifica = !this.payload.showHelp &&
      ((this.code === "KeyC" && this.altKey) ||
      (this.code === "Escape" && this.payload.showClassification));

    // Condizione Help
    const help = ((this.code === "KeyH" && this.altKey) ||
      (this.code === "Escape" && this.payload.showHelp));

    if (classifica) this.onShowClassification();

    else {

      if (help) this.onShowHelp();
    }

    if (game) {

      if (this.payload.showHelp) this.onShowHelp();
      if (this.payload.showClassification) this.onShowClassification();
    }
  }

  override homeHelpHandler() {

    this.onShowHelpClassification();

    if (["ArrowLeft", "ArrowRight"].includes(this.code)) {

      this.forceFocusout(this.buttons);
    }

    if (this.code === "KeyX" && (this.ctrlKey || this.metaKey)) {

      this.payload.gioco = -1;
    }
  }
}
