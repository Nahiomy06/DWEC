import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-contactos',
  styleUrl: './contactos.css',
  templateUrl: './contactos.html',
})
export class Contactos {
  private readonly fb = inject(FormBuilder);

  enviando = false;
  enviado = false;

  contactForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    empresa: [''],
    servicio: ['', [Validators.required]],
    mensaje: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(1000)]],
    aceptaPolitica: [false, [Validators.requiredTrue]],
  });

  isInvalid(controlName: keyof typeof this.contactForm.controls): boolean {
    const control = this.contactForm.get(controlName);
    return Boolean(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const payload = this.contactForm.getRawValue();

    // Aquí puedes conectar tu servicio HTTP real (ej. this.contactoService.enviar(payload))
    setTimeout(() => {
      console.log('Formulario de contacto enviado:', payload);
      this.enviando = false;
      this.enviado = true;
    }, 600);
  }

  resetForm(): void {
    this.contactForm.reset({
      nombre: '',
      email: '',
      empresa: '',
      servicio: '',
      mensaje: '',
      aceptaPolitica: false,
    });
    this.enviado = false;
  }
}
