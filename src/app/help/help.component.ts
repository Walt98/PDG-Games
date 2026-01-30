import { Component } from '@angular/core';
import { HClassificaComponent } from './sezioni/h-classifica.component';
import { HListaGiochiComponent } from './sezioni/h-lista-giochi.component';
import { HPassaParolaComponent } from './sezioni/h-passa-parola.component';
import { HFourImagesOneWordComponent } from './sezioni/h-four-images-one-word.component';
import { HChiSonoComponent } from './sezioni/h-chi-sono.component';
import { HCompletaIlVersoComponent } from './sezioni/h-completa-il-verso.component';
import { HReazioneACatenaComponent } from './sezioni/h-reazione-a-catena.component';
import { HImpiccatoComponent } from './sezioni/h-impiccato.component';
import { HGuessLogoComponent } from './sezioni/h-guess-logo.component';
import { Base } from '../base.directive';

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
    HImpiccatoComponent,
    HGuessLogoComponent
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent extends Base { }
