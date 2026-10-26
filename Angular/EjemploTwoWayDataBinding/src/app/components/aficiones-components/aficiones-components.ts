import { FormsModule } from '@angular/forms';
import { Iaficiones } from './../../interface/Iaficiones';
import { Component } from '@angular/core';

@Component({
  imports: [FormsModule],
  selector: 'app-aficiones-components',
  styleUrl: './aficiones-components.css',
  templateUrl: './aficiones-components.html',
})
export class AficionesComponents {
  arrAficione: Iaficiones[];
  newAficion: Iaficiones;

  constructor() {
    this.arrAficione = [];
    this.newAficion = {
      aficion: '',
      nombre: '',
    };
  }

  guradarDatos(): void {
    this.arrAficione.push(this.newAficion);
    this.newAficion = {
      aficion: '',
      nombre: '',
    };
    console.log(this.arrAficione);
  }

  cargarDatos(): string {
    let html: string = '';

    this.arrAficione.forEach((afi) => {
      html += `<li>${afi.aficion} - ${afi.nombre}</li>`;
    });

    return html;
  }
}
