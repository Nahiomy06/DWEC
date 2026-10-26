import { Ideporte } from './../../interfaces/ideporte';
import { Component, input } from '@angular/core';

@Component({
  imports: [DeporteComponent],
  selector: 'app-deporte-component',
  styleUrl: './deporte-component.css',
  templateUrl: './deporte-component.html',
})
export class DeporteComponent {
  @input() deporte: int;

  constructor() {}
}
