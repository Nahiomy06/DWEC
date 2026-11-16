import { Service } from '@angular/core';
import { ISerie } from '../interfaces/iserie';

@Service()
export class SeriesService {
    private arrSeries: ISerie[];
    private url: string = "https://peticiones.online/api/series";
    private id: number;


    constructor() {
        this.arrSeries = [];
        this.connectSeries();
        this.id = this.arrSeries.length;
    }

    getAllSeries(): ISerie[] {
        return this.arrSeries;
    }

    private connectSeries() {
        fetch(this.url)
            .then(response => response.json())
            .then(datos => {
                datos.forEach((element: any) => {
                    let serie: ISerie = element as ISerie;
                    this.arrSeries.push(serie);
                });
            });

        console.log(this.arrSeries);
        return this.arrSeries;
    }

    addSerie(serie: ISerie): void {
        if (!this.arrSeries.includes(serie) && serie != null) {
            serie.id = this.id;
            this.arrSeries.push(serie);
            this.id++;
        }
    }

    delSerie(miSerie: ISerie) {
        this.arrSeries = this.arrSeries.filter(serie => serie.title !== miSerie.title);
    }

}

