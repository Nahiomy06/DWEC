import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ISeries } from '../../interfaces/iseries';
import { SeriesServices } from '../../services/series-services';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-serie-form',
  styleUrl: './serie-form.css',
  templateUrl: './serie-form.html',
})
export class SerieForm {
  SerieForm: FormGroup;
  seriesServices = inject(SeriesServices);

  constructor() {
    this.SerieForm = new FormGroup({
      id: new FormControl(null, []),
      title: new FormControl(null, [Validators.required]),
      creator: new FormControl(null, [Validators.required]),
      rating: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
      dates: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      channel: new FormControl(null, [Validators.required]),
    });
  }

  getDataForm() {
    let serie: ISeries = this.SerieForm.value as ISeries;
    serie.id = -1;

    //Lamar al servicio
    this.seriesServices.addSerie(serie);

    this.SerieForm.reset();
  }
}
