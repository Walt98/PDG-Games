import { Component } from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import data from '../../../public/game3items.json';

declare type CompletaIlVersoItem = { verso: string; risposte: string[]; };

@Component({
  selector: 'app-completa-il-verso',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './completa-il-verso.component.html',
  styleUrl: './completa-il-verso.component.scss'
})
export class CompletaIlVersoComponent {

  items = JSON.parse(JSON.stringify(data)) as CompletaIlVersoItem[];
}
