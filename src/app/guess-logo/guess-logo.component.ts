import { Component } from '@angular/core';
import { HandlerBase } from '../handler-base.directive';

@Component({
  selector: 'app-guess-logo',
  standalone: true,
  imports: [],
  templateUrl: './guess-logo.component.html',
  styleUrl: './guess-logo.component.scss'
})
export class GuessLogoComponent extends HandlerBase {

}
