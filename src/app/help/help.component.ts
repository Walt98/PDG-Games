import { Component, HostListener } from '@angular/core';
import { PayloadService } from '../payload.service';
import { HClassificaComponent } from './h-classifica/h-classifica.component';
import { HListaGiochiComponent } from './h-lista-giochi/h-lista-giochi.component';
import { HPassaParolaComponent } from './h-passa-parola/h-passa-parola.component';
import { HFourImagesOneWordComponent } from './h-four-images-one-word/h-four-images-one-word.component';
import { HChiSonoComponent } from './h-chi-sono/h-chi-sono.component';
import { HCompletaIlVersoComponent } from './h-completa-il-verso/h-completa-il-verso.component';
import { HReazioneACatenaComponent } from './h-reazione-a-catena/h-reazione-a-catena.component';
import { HImpiccatoComponent } from './h-impiccato/h-impiccato.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    HClassificaComponent,
    HListaGiochiComponent,
    HPassaParolaComponent,
    HFourImagesOneWordComponent,
    HChiSonoComponent,
    HCompletaIlVersoComponent,
    HReazioneACatenaComponent,
    HImpiccatoComponent
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

  constructor(public payload: PayloadService) { }

  /**
   * Evento keydown.
   */
  @HostListener("document:keydown", ["$event.code"]) onKeydown(code: string) {

    if (code === "Escape") this.payload.showHelp = false;
  }
}
