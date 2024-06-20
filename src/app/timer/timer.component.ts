import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, interval, skip, takeUntil } from 'rxjs';
import { PayloadService } from '../payload.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy {

  @Input() timer!: number;

  @Output() timeout = new EventEmitter<void>();

  minuti!: number;
  secondi!: string;
  isStarted = false;
  destroy$ = new Subject<void>();

  constructor(public payload: PayloadService) { }

  ngOnInit(): void {

    this.setValues();

    this.payload.startTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => {

      this.isStarted = false;
      this.startTimer();
    });

    this.payload.stopTimer$.pipe(takeUntil(this.destroy$)).subscribe(() => {

      this.isStarted = false;
      this.payload.timerSubscription?.unsubscribe();
    });
  }

  ngOnDestroy(): void {

    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Imposta minuti e secondi del timer.
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

  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (code === "ArrowUp") {

      this.timer++;
      this.setValues();
    }

    if (code === "ArrowDown" && this.timer > 0) {

      this.timer--;
      this.setValues();
    }

    if (code === "Space") this.setTimer();
  }

  /**
   * Avvia e ferma il timer.
   */
  setTimer() {

    this.isStarted = !this.isStarted;

    if (this.isStarted) this.startTimer();
    else this.payload.timerSubscription.unsubscribe();
  }

  /**
   * Fa partire il timer.
   */
  private startTimer() {

    this.payload.timerSubscription = interval(1000).subscribe(() => {

      // Decrementa il tempo rimanente di 1 secondo
      if (this.timer > 1) {

        this.timer--;
        this.setValues();
      }

      // Per ridurre il più possibile il delay tra timer e gong
      // ho preferito settarlo io stesso a 0 e far partire subito l'audio
      else {

        this.timer = 0;
        this.setValues();

        // Ferma il timer quando il tempo è scaduto
        const audio = new Audio("/gong.mp3");
        audio.play();
        this.payload.timerSubscription.unsubscribe();
        this.isStarted = false;
        this.timeout.emit();
      }
    });
  }
}
