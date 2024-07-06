import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {

  @Output() close = new EventEmitter<void>();

  @ViewChild("introVideo") introVideo!: ElementRef;

  show = false;

  /**
   * Mostra il video.
   */
  showVideo() {

    if (!this.show) {

      this.show = true;
      this.introVideo.nativeElement.play();

      setTimeout(() => this.close.emit(), 15000);
    }
  }

  /**
   * Eventi keydown dell'intro.
   */
  @HostListener('document:keydown', ['$event.code']) onKeydown(code: string) {

    if (code === "Enter") this.showVideo();
  }
}
