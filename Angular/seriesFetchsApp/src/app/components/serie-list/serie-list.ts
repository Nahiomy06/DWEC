import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ISeries } from '../../interfaces/iseries';
import { SeriesServices } from '../../services/series-services';
import { SerieCard } from '../serie-card/serie-card';

@Component({
  imports: [SerieCard],
  selector: 'app-serie-list',
  styleUrl: './serie-list.css',
  templateUrl: './serie-list.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SerieList {
  arraySeries: ISeries[];
  private SeriesServices = inject(SeriesServices);

  constructor() {
    this.arraySeries = [];
  }

  ngOnInit(): void {
    this.arraySeries = this.SeriesServices.getAllSeries();
  }
}
