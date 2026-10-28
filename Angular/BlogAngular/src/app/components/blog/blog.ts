import { Component } from '@angular/core';
import { Inoticia } from '../../interfaces/inoticia';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-blog',
  styleUrl: './blog.css',
  templateUrl: './blog.html',
})
export class Blog {
  noticias: Inoticia[];

  constructor() {
    this.noticias = [
      {
        title: 'Lanzamiento de la nueva versión de Angular',
        img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
        info: 'El equipo de desarrollo ha anunciado mejoras significativas en el rendimiento, optimización de componentes y nuevas herramientas para desarrolladores front-end.',
        publDate: new Date('2026-03-01'),
      },
      {
        title: 'Ventajas de usar SPA en aplicaciones web modernas',
        img: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        info: 'Las aplicaciones de página única (Single Page Application) permiten una navegación mucho más fluida sin recargar la página completa, mejorando la experiencia del usuario.',
        publDate: new Date('2026-03-05'),
      },
    ];
  }
}
