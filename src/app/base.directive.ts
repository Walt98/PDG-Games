import { ElementRef, inject, Injector, QueryList, runInInjectionContext } from "@angular/core";
import { PayloadService } from "./payload.service";
import { timer } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

/**
 * Classe di base.
 */
export class Base {

  public showTimer = true;

  public payload = inject(PayloadService);
  private injector = inject(Injector);

  /**
   * Forza il focusout dei elementi indicati in parametro.
   */
  forceFocusout(elements?: QueryList<ElementRef>) {

    if (elements) elements.forEach(e => e.nativeElement.blur());
  }

  /**
   * Metodo che fa partire un timer rxjs di n *ms* (millisecondi) e una successiva callback.
   */
  timerRxJS(ms: number, callback: () => void) {

    runInInjectionContext(this.injector, () => {

      timer(ms).pipe(takeUntilDestroyed()).subscribe(() => callback());
    });
  }

  /**
   * Metodo che fa ripartire il timer del gioco da capo.
   */
  restartTimer() {

    this.showTimer = false;

    this.timerRxJS(1, () => {
      this.showTimer = true;
      this.payload.timerSubscription?.unsubscribe();
    });
  }

  /**
   * Chiude il gioco aperto e mostra un eventuale messaggio.
   */
  closeGame(alertMessage?: string) {

    if (alertMessage?.length) alert(alertMessage);

    this.timerRxJS(0, () => this.payload.gioco = -1);
  }

  /**
   * Riproduce il suono descritto in parametro.
   */
  play(sound: "success" | "error" | "skip" | "gong") {

    const audio = new Audio(`/${sound}.mp3`);
    audio.play();
  }
}
