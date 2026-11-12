import { Component, Input } from '@angular/core';
import { ISeries } from '../../interfaces/iseries';

@Component({
  imports: [],
  selector: 'app-serie-card',
  styleUrl: './serie-card.css',
  templateUrl: './serie-card.html',
})
export class SerieCard {
  @Input() miSerie!: ISeries;

  deleteSerie(miSerie: ISeries) {}
}
