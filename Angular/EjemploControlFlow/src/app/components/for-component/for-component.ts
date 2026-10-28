import { Component } from '@angular/core';
import { Iestudiante } from '../../interface/iestudiante';

@Component({
  imports: [],
  selector: 'app-for-component',
  styleUrl: './for-component.css',
  templateUrl: './for-component.html',
})
export class ForComponent {
  estudiantes: Iestudiante[];
  nElement;
  constructor() {
    this.estudiantes = [
      { id: 0, name: 'Pierro (The Jester)', age: 500 },
      { id: 1, name: 'Capitano (The Captain)', age: 500 },
      { id: 2, name: 'Il Dottore (The Doctor)', age: 400 },
      { id: 3, name: 'Columbina (The Damselette)', age: 500 },
      { id: 4, name: 'Arlecchino (The Knave)', age: 28 },
      { id: 5, name: 'Pulcinella (The Rooster)', age: 80 },
      { id: 6, name: 'Scaramouche (The Balladeer)', age: 500 },
      { id: 7, name: 'Sandrone (The Marionette)', age: 500 },
      { id: 8, name: 'La Signora (The Fair Lady)', age: 500 },
      { id: 9, name: 'Pantalone (The Regrator)', age: 35 },
      { id: 10, name: 'Desconocido / Vacante', age: 0 },
      { id: 11, name: 'Tartaglia (Childe)', age: 21 },
    ];

    this.nElement = this.estudiantes.length;
  }

  insertarEstudiante(): void {
    let estudiante: Iestudiante = {
      id: this.nElement + 1,
      name: 'Traveler',
      age: 9000,
    };
    this.estudiantes.push(estudiante);
  }

  eliminarEstudiante(): void {
    this.estudiantes.pop();
  }
}
