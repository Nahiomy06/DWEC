import { Component, inject } from '@angular/core';
import { IserviciosProfecionales } from '../../interfaces/iservicios-profecionales';
import { ServiceProfesionalesService } from '../../services/servicios-profecionales-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-servicios-detail',
  styleUrl: './servicios-detail.css',
  templateUrl: './servicios-detail.html',
})
export class ServiciosDetail {
  miServicioProfesional!: IserviciosProfecionales;
  private miServicio = inject(ServiceProfesionalesService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      //Recoger mi parametro de ruta
      let url: string = params.url; //igual que esta en el app.route.ts

      if (url != undefined) {
        //Pedir al servicio el servicioProfesional
        let response = this.miServicio.getByUrl(url);
        if (response != undefined) {
          if (response.url == 'error') {
            //NAvegar a 404
            this.router.navigate(['404']);
          }
          this.miServicioProfesional = response;
        }
      }
    });
  }
}
