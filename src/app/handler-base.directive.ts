import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { fromEvent } from "rxjs";
import { Base } from "./base.directive";

/**
 * Classe di base che implementa un handler per eventi di tipo keydown.
 */
export class HandlerBase extends Base {

  code!: string;
  key!: string;
  shiftKey = false;
  altKey = false;
  ctrlKey = false;
  metaKey = false;  // Tastiera Mac

  constructor() {
    super();

    fromEvent<KeyboardEvent>(document, 'keydown')
    .pipe(takeUntilDestroyed())
    .subscribe(event => this.handler(event));
  }

  /**
   * Eventi keydown delle varie schermate.
   */
  private handler(event: KeyboardEvent) {

    this.code = event.code;
    this.key = event.key;
    this.shiftKey = event.shiftKey;
    this.altKey = event.altKey;
    this.ctrlKey = event.ctrlKey;
    this.metaKey = event.metaKey;

    if (this.payload.showIntro) this.introHandler();

    else {

      if (this.showTimer) this.timerHandler();
      if (this.payload.showClassification) this.classificationHandler();
  
      this.homeHelpHandler();
  
      switch (this.payload.gioco) {

        case 0: this.passaParolaHandler(); break;
        case 1: this.fourImagesOneWordHandler(); break;
        case 2: this.chiSonoHandler(); break;
        case 3: this.completaIlVersoHandler(); break;
        case 4: this.reazioneACatenaHandler(); break;
        case 5: this.impiccatoHandler(); break;
        case 6: this.guessLogoHandler(); break;
        default: this.listaGiochiHandler(); break;
      }
    }

    // GESTIRE I CASI DELLE SCHERMATE DI GIOCO MA ANCHE DI TUTTE LE ALTRE, NELL'ORDINE CORRETTO
  }

  /** Handler schermata Intro. */
  introHandler() {}
  /** Handler Timer. */
  timerHandler() {}
  /** Handler schermata Classifica. */
  classificationHandler() {}
  /** Handler schermate Home ed Help. */
  homeHelpHandler() {}
  /** Handler schermata Passa-Parola di Dio. */
  passaParolaHandler() {}
  /** Handler schermata 4 immagini 1 Parola di Dio. */
  fourImagesOneWordHandler() {}
  /** Handler schermata Chi sono?. */
  chiSonoHandler() {}
  /** Handler schermata Completa il verso. */
  completaIlVersoHandler() {}
  /** Handler schermata Reazione a catena. */
  reazioneACatenaHandler() {}
  /** Handler schermata Impiccato. */
  impiccatoHandler() {}
  /** Handler schermata Indovina il logo. */
  guessLogoHandler() {}
  /** Handler schermata Lista giochi. */
  listaGiochiHandler() {}
}
