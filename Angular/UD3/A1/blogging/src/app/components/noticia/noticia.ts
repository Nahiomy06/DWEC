import { Component, Input } from '@angular/core';
import { Inoticias } from '../../interfaces/inoticias';

@Component({
  imports: [],
  selector: 'app-noticia',
  styleUrl: './noticia.css',
  templateUrl: './noticia.html',
})
export class Noticia {

  @Input() noticia: Inoticias;

  constructor() {
    this.noticia = {
      "titulo": "Noticia no definida",
      "imagenURL": "",
      "fechaPublicacion": new Date(),
      "texto": ""
    };
  }
}
