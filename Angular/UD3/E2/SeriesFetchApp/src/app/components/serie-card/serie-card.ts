import { SeriesService } from './../../services/series-service';
import { Component, inject, Input } from '@angular/core';
import { ISerie } from '../../interfaces/iserie';

@Component({
	imports: [],
	selector: 'app-serie-card',
	styleUrl: './serie-card.css',
	templateUrl: './serie-card.html',
})
export class SerieCard {
	@Input() miSerie!: ISerie;
	seriesService = inject(SeriesService);

	deleteSerie(miSerie: ISerie) {
		this.seriesService.delSerie(miSerie)
	}
}
