import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent extends HandlerBase {

  @Output() close = new EventEmitter<void>();

  @ViewChild("introVideo") introVideo!: ElementRef;

  show = false;
  shiftClose = false;

  /**
   * Mostra il video.
   */
  showVideo() {

    if (!this.show) {

      this.show = true;
      this.introVideo.nativeElement.play();
    }
  }

  /**
   * Evento ended del video.
   * 
   * Chiude il componente facendo mostrare la lista dei giochi.
   */
  onEnded() {

    if (!this.shiftClose) this.close.emit();
  }

  override introHandler() {

    if (this.code === "Enter") {

      if (this.shiftKey) {

        this.shiftClose = true;
        this.close.emit();
      }

      else this.showVideo();
    }
  }
}
