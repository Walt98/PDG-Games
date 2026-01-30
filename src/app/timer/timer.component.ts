import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, interval, takeUntil } from 'rxjs';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent extends HandlerBase implements OnInit, OnDestroy {

  @Input() timer!: number;

  @Output() timeout = new EventEmitter<void>();

  minuti!: number;
  secondi!: string;
  isStarted = false;
  destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.setValues();

    this.payload.startTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => this.setTimer(true));
    this.payload.stopTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => this.setTimer(false));
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fa partire il timer.
   */
  private startTimer() {

    this.payload.timerSubscription = interval(1000).pipe(takeUntil(this.destroy$)).subscribe(() => {

      // Decrementa il tempo rimanente di 1 secondo
      if (this.timer > 1) {

        this.timer--;
        this.setValues();
      }

      // Per ridurre il più possibile il delay tra timer e gong
      // ho preferito settarlo manualmente a 0 e far partire subito l'audio
      else {

        this.timer = 0;
        this.setValues();

        // Ferma il timer quando il tempo è scaduto
        this.play("gong");
        this.payload.timerSubscription.unsubscribe();
        this.isStarted = false;
        this.timeout.emit();
      }
    });
  }

  /**
   * Imposta minuti e secondi in base al valore del campo *timer* .
   */
  setValues() {

    let timerTmp = this.timer + 0;
    this.minuti = 0;

    while (timerTmp >= 60) {
      timerTmp -= 60;
      this.minuti += 1;
    }

    this.secondi = timerTmp + "";

    if (this.secondi.length === 1 && this.minuti > 0) this.secondi = "0" + this.secondi;
  }

  /**
   * Avvia e ferma il timer.
   */
  setTimer(isStarted?: boolean) {

    if (isStarted !== undefined) this.isStarted = isStarted;
    else this.isStarted = !this.isStarted;

    if (this.isStarted) this.startTimer();
    else this.payload.timerSubscription?.unsubscribe();
  }

  override timerHandler() {

    if (!this.payload.showClassification && !this.payload.showHelp) {

      if (this.code === "ArrowUp") {

        // Aumenta il timer di 1 o 10 secondi, in base al valore di shiftKey
        this.timer += this.shiftKey ? 10 : 1;
        this.setValues();
      }

      if (this.code === "ArrowDown") {

        // Diminuisce il timer di 10 secondi max: se il timer è sotto i 10 secondi
        // toglie il rimanente per arrivare a 0; se è già 0 non fa nulla
        if (this.shiftKey) {

          if (this.timer > 9) this.timer -= 10;

          else {

            if (this.timer > 0 && this.timer < 10) this.timer = 0;
          }
        }

        // Diminuisce il timer di un secondo se è maggiore di 0
        else {

          if (this.timer > 0) this.timer--;
        }

        this.setValues();
      }

      if (this.code === "Space") this.setTimer();
    }
  }
}
