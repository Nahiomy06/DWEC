import { Component } from '@angular/core';
import { Inoticias } from '../../interfaces/inoticias';
import { Noticia } from '../noticia/noticia';
import { Formulario } from '../formulario/formulario';

@Component({
	imports: [Noticia, Formulario],
	selector: 'app-blog',
	styleUrl: './blog.css',
	templateUrl: './blog.html',
})
export class Blog {

	noticias: Inoticias[];

	constructor() {
		this.noticias = [
			{
				"titulo": "Inauguran un nuevo parque en la ciudad",
				"imagenURL": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
				"texto": "La ciudad ha inaugurado un nuevo parque con zonas verdes, bancos y espacios para pasear. El objetivo es ofrecer a los vecinos un lugar tranquilo para disfrutar del aire libre.",
				"fechaPublicacion": new Date(2026, 9, 28)
			},
			{
				"titulo": "Los estudiantes participan en una jornada tecnológica",
				"imagenURL": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
				"texto": "Varios estudiantes han participado en una jornada dedicada a la tecnología y la innovación. Durante el evento, han realizado talleres de programación y conocido nuevas herramientas digitales.",
				"fechaPublicacion": new Date(2026, 9, 27)
			}
		];
		
	}

	addNoticia($event: Inoticias): void {	
		this.noticias.push($event);
	}
}
