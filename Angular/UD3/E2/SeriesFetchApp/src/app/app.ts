import { SeriesService } from './services/series-service';
import { Component, inject, signal } from '@angular/core';
import { SerieList } from './components/serie-list/serie-list';
import { SerieForm } from './components/serie-form/serie-form';

@Component({
	imports: [SerieList, SerieForm],
	selector: 'app-root',
	styleUrl: './app.css',
	templateUrl: './app.html',
})

export class App {
	protected readonly title = signal('SeriesFetchApp');
}
