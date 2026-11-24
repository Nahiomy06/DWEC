import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ServiceProfesionalesService } from '../../services/servicios-profecionales-service';
import { Router, RouterLink } from '@angular/router';
import { email } from '@angular/forms/signals';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  private miServicio = inject(ServiceProfesionalesService);
  private router = inject(Router);

  getSuscribe(suscribeForm: NgForm) {
    if (suscribeForm.value.email !== '') {
      let email = suscribeForm.value.email;
      this.miServicio.registrarMail(email);
      this.router.navigate(['/servicio']);
      suscribeForm.reset();
    }
  }
}
