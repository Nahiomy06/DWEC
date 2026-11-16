import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ISerie } from '../../interfaces/iserie';
import { SeriesService } from '../../services/series-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-serie-form',
  styleUrl: './serie-form.css',
  templateUrl: './serie-form.html',
})
export class SerieForm {
  serieForm: FormGroup;
  seriesService = inject(SeriesService);

  constructor() {
    this.serieForm = new FormGroup({
      id: new FormControl(null, []),
      title: new FormControl(null, [Validators.required]),
    });
  }

  getDaraForm() {
    let serie: ISerie = this.serieForm.value as ISerie;
    serie.id = -1;
    this.seriesService.addSerie(serie);
    this.serieForm.reset();
  }
}
