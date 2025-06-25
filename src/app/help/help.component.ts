import { Component } from '@angular/core';
import { PayloadService } from '../payload.service';
import { HClassificaComponent } from './sezioni/h-classifica.component';
import { HListaGiochiComponent } from './sezioni/h-lista-giochi.component';
import { HPassaParolaComponent } from './sezioni/h-passa-parola.component';
import { HFourImagesOneWordComponent } from './sezioni/h-four-images-one-word.component';
import { HChiSonoComponent } from './sezioni/h-chi-sono.component';
import { HCompletaIlVersoComponent } from './sezioni/h-completa-il-verso.component';
import { HReazioneACatenaComponent } from './sezioni/h-reazione-a-catena.component';
import { HImpiccatoComponent } from './sezioni/h-impiccato.component';

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
}
