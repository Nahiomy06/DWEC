import { Component, inject } from '@angular/core';
import { IserviciosProfecionales } from '../../interfaces/iservicios-profecionales';
import { ServiceProfesionalesService } from '../../services/servicios-profecionales-service';
import { ServiciosCard } from '../../components/servicios-card/servicios-card';

@Component({
  imports: [ServiciosCard],
  selector: 'app-servicios-profecionales',
  styleUrl: './servicios-profecionales.css',
  templateUrl: './servicios-profecionales.html',
})
export class ServiciosProfecionales {
  miServicio = inject(ServiceProfesionalesService);
  arraySeviciosProf: IserviciosProfecionales[];

  constructor() {
    this.arraySeviciosProf = [];
  }

  ngOnInit(): void {
    this.arraySeviciosProf = this.miServicio.getAllServiciosProfesionales();
  }
}
