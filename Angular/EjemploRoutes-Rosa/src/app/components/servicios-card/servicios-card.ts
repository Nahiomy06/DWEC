import { Component, Input } from '@angular/core';
import { IserviciosProfecionales } from '../../interfaces/iservicios-profecionales';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-servicios-card',
  styleUrl: './servicios-card.css',
  templateUrl: './servicios-card.html',
})
export class ServiciosCard {
  @Input() miServicioProf!: IserviciosProfecionales;
}
