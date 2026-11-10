import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UserServices } from '../../services/user-services';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-formulario-reactive-form-model',
  styleUrl: './formulario-reactive-form-model.css',
  templateUrl: './formulario-reactive-form-model.html',
})
export class FormularioReactiveFormModel {
  modelForm: FormGroup;
  private UserServices = inject(UserServices);

  constructor() {
    this.modelForm = new FormGroup({
      nombre: new FormControl(null, []),
      email: new FormControl(null, []),
      edad: new FormControl(null, []),
      dni: new FormControl(null, []),
      password: new FormControl(null, []),
      repitePassword: new FormControl(null, []),
    });
  }

  getDataForm(): void {
    let user = this.modelForm.value as IUser;
    this.UserServices.registrarUsuarios(user);
    //todo logica.

    this.modelForm.reset();
  }
}
