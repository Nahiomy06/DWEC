import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ISerie } from '../../interfaces/iserie';
import { SeriesService } from '../../services/series-service';
import { SerieCard } from '../serie-card/serie-card';

@Component({
	imports: [SerieCard],
	selector: 'app-serie-list',
	styleUrl: './serie-list.css',
	templateUrl: './serie-list.html',
	changeDetection: ChangeDetectionStrategy.Eager
})
export class SerieList {

	private seriesService = inject(SeriesService);
	seriesArray: ISerie[];

	constructor() {
		this.seriesArray = [];
	}

	ngOnInit(): void {
		this.seriesArray = this.seriesService.getAllSeries();
	}


}
