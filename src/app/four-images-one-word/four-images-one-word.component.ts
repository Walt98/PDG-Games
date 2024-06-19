import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-four-images-one-word',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './four-images-one-word.component.html',
  styleUrl: './four-images-one-word.component.scss'
})
export class FourImagesOneWordComponent implements OnInit {

  words = ["esempio"];
  word: string[] = [];

  ngOnInit(): void {

    this.word = this.words[0].toUpperCase().split("");
  }
}
