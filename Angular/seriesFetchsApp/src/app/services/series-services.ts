import { Service } from '@angular/core';
import { ISeries } from '../interfaces/iseries';

@Service()
export class SeriesServices {
  private arrSeries: ISeries[];
  private url: string = 'https://peticiones.online/api/series';

  private id: number;

  constructor() {
    this.arrSeries = [];
    this.id = this.arrSeries.length;
  }

  getAllSeries(): ISeries[] {
    fetch(this.url)
      .then((response) => response.json())
      .then((datos) => {
        datos.forEach((element: any) => {
          let serie: ISeries = element as ISeries;
          this.arrSeries.push(serie);
        });
      });

    console.log(this.arrSeries);
    return this.arrSeries;
  }

  addSerie(serie: ISeries): void {
    if (!this.arrSeries.includes(serie) && serie != null) {
      serie.id = this.id;
      this.arrSeries.push(serie);
      this.id++;
    }
  }
}
