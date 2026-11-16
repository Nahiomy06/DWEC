import { Component, EventEmitter, Output } from '@angular/core';
import { Inoticias } from '../../interfaces/inoticias';
import { FormsModule } from '@angular/forms';

@Component({
	imports: [FormsModule],
	selector: 'app-formulario',
	styleUrl: './formulario.css',
	templateUrl: './formulario.html',
})
export class Formulario {

	tituloValido: boolean;
	urlValido: boolean;
	fechaValido: boolean;
	textoValido: boolean;


	noticia: Inoticias;

	@Output() newNoticia: EventEmitter<Inoticias>;

	constructor() {
		this.newNoticia = new EventEmitter();

		this.tituloValido = false;
		this.urlValido = false;
		this.fechaValido = false;
		this.textoValido = false;

		this.noticia = {
			"titulo": "",
			"imagenURL": "",
			"texto": "",
			"fechaPublicacion": new Date()
		};
	}

	enviar(): void {
		if (this.validarCampos()) {
			this.noticia.fechaPublicacion = new Date(this.noticia.fechaPublicacion);
			this.newNoticia.emit(this.noticia);

			this.noticia = {
				"titulo": "",
				"imagenURL": "",
				"texto": "",
				"fechaPublicacion": new Date()
			};
		}
	}

	private validarCampos(): boolean {
		if (this.noticia.titulo.match("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,50}$")) {
			this.tituloValido = false;
		} else {
			this.tituloValido = true;
		}

		if (this.noticia.imagenURL.match(/^https?:\/\/(?:[\w-]+\.)+[\w-]+(?:\/[^\s]*)?$/i)) {
			this.urlValido = false;
		} else {
			this.urlValido = true;
		}

		if (this.noticia.fechaPublicacion.getDate == null) {
			this.fechaValido = false;
		} else {
			this.fechaValido = true;
		}

		if (this.noticia.texto.match("^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{3,}$")) {
			this.textoValido = false;
		} else {
			this.textoValido = true;
		}

		return !(this.tituloValido || this.urlValido || this.fechaValido || this.textoValido);
	}
}
