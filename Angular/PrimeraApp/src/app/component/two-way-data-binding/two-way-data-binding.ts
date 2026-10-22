import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ipersona } from '../../interfaces/ipersona.interface';

@Component({
  imports: [FormsModule],
  selector: 'app-two-way-data-binding',
  styleUrl: './two-way-data-binding.css',
  templateUrl: './two-way-data-binding.html',
})
export class TwoWayDataBinding {
  texto: string = 'Soy un texto de prueba';

  miPersona: Ipersona;

  constructor() {
    this.miPersona = {
      nombre: '',
      apellido: '',
      dni: '',
    };
  }

  MostrarPerosna(): string {
    return `${this.miPersona.nombre} ${this.miPersona.apellido} ${this.miPersona.dni}`;
  }
}
