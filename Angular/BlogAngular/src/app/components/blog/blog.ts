import { Component } from '@angular/core';
import { Inoticia } from '../../interfaces/inoticia';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  imports: [FormsModule, DatePipe],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {
  noticias: Inoticia[];
  nuevaNoticia: Inoticia;

  constructor() {
    this.noticias = [
      {
        title: 'Lanzamiento de la nueva versión de Angular',
        img: 'https://placehold.co/400x400',
        info: 'El equipo de desarrollo ha anunciado mejoras significativas en el rendimiento, optimización de componentes y nuevas herramientas para desarrolladores front-end.',
        publDate: new Date('2026-03-01'),
      },
      {
        title: 'Ventajas de usar SPA en aplicaciones web modernas',
        img: 'https://placehold.co/400x400',
        info: 'Las aplicaciones de página única (Single Page Application) permiten una navegación mucho más fluida sin recargar la página completa, mejorando la experiencia del usuario.',
        publDate: new Date('2026-03-05'),
      },
    ];
    this.nuevaNoticia = { title: '', img: '', info: '', publDate: new Date() };
  }

  publicarNoticia(): void {
    this.nuevaNoticia.publDate = new Date();
    this.noticias.push(this.nuevaNoticia);
    this.nuevaNoticia = { title: '', img: '', info: '', publDate: new Date() };
    console.log(this.noticias);
  }
}
