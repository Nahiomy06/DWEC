import { Service } from '@angular/core';
import { IserviciosProfecionales } from '../interfaces/iservicios-profecionales';
import { SERVICIOSPROFESIONALES } from '../../db/serviciosProfesionales.db';
import {
  PathKind,
  SchemaPath,
  SchemaPathRules,
  LogicFn,
  OneOrMany,
  ValidationError,
} from '@angular/forms/signals';

@Service()
export class ServiceProfesionalesService {
  private arrServiciosProfesionales: IserviciosProfecionales[];
  private arrEmail: string[] = [];

  constructor() {
    this.arrServiciosProfesionales = SERVICIOSPROFESIONALES;
  }

  getAllServiciosProfesionales(): IserviciosProfecionales[] {
    return this.arrServiciosProfesionales;
  }

  getByUrl(miUrl: string): IserviciosProfecionales {
    let servicioProfesional: IserviciosProfecionales;

    let response = this.arrServiciosProfesionales.find((s) => s.url == miUrl);

    if (response != undefined) {
      servicioProfesional = response;
    } else {
      servicioProfesional = {
        title: 'Servicio no encontrado',
        description: 'Contacte con el adminsitrador',
        url: 'error',
      };
    }

    return servicioProfesional;
  }

  registrarMail(email: string) {
    this.arrEmail.push(email);
  }
}
