import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-data-binding-ej',
  styleUrl: './data-binding-ej1.css',
  templateUrl: './data-binding-ej1.html',
})
export class DataBindingEj {
  horas: number;
  minutos: number;
  color: string[];
  estado: boolean;
  url: string;
  stock: boolean;
  contador: number;

  constructor() {
    this.horas = 21;
    this.minutos = 22;
    this.color = ['Azul', 'Rojo', 'Amarillo', 'Verde', 'Rosa', 'Violeta', 'Naranja'];
    this.estado = true;
    this.url = 'https://nakama.es';
    this.stock = true;
    this.contador = 0;
  }

  horaActual(): string {
    return `${this.horas}:${this.minutos}`;
  }

  listaColores(): string {
    let miLista: string;
    miLista = '<ul>';
    for (let s of this.color) {
      miLista = miLista + `<li>${s}</li>`;
    }
    miLista = miLista + '</ul>';
    return miLista;
  }

  actulizarURL(): string {
    this.url = 'https://as.com';
    return this.url;
  }

  sumar() {
    this.contador++;
    alert('has pulsado ' + this.contador + ' veces');
  }

  reset() {
    this.contador = 0;
    alert('hemos reiniciado el control');
  }

  restar() {
    this.contador--;
    alert('el contador es ' + this.contador);
  }
}
