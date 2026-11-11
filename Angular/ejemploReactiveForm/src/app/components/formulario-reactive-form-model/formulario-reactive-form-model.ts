import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../interfaces/iuser.interface';
import { UserServices } from '../../services/user-services';
import { validate } from '@angular/forms/signals';

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
    this.modelForm = new FormGroup(
      {
        id: new FormControl(-1),
        nombre: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),

        email: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
        ]),

        edad: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(120)]),

        dni: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i),
        ]),

        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
          ),
        ]),

        repitePassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
          ),
        ]),
      },
      [this.passValidator],
    );
  }

  ngOnInit(): void {
    let user: IUser = {
      id: 3,
      nombre: 'Nahiomy',
      email: 'nanacaram06@gmail.com',
      edad: 20,
      dni: '12345678E',
      password: 'Canva2026!',
      repitePassword: 'Canva2026!',
    };

    //opcion 1
    // this.modelForm.setValue(user);

    //opcion 2 :puedo meter mis propios validadores al cargar y/o descativar otros que tenia, o no cargarlos y ya.

    this.modelForm = new FormGroup(
      {
        id: new FormControl(user.id),
        nombre: new FormControl(user.nombre, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),

        email: new FormControl(user.email, [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/),
        ]),

        edad: new FormControl(user.edad, [
          Validators.required,
          Validators.min(0),
          Validators.max(120),
        ]),

        dni: new FormControl(user.dni, [
          Validators.required,
          Validators.pattern(/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i),
        ]),

        password: new FormControl(user.password, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
          ),
        ]),

        repitePassword: new FormControl(user.repitePassword, [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/,
          ),
        ]),
      },
      [this.passValidator],
    );
  }

  getDataForm(): void {
    let user = this.modelForm.value as IUser;
    if (user.id == -1) {
      this.UserServices.registrarUsuarios(user);
    } else {
      this.UserServices.actualizarUsuario(user);
    }
    //todo logica.

    this.modelForm.reset();
  }

  checkControl(FormControlName: string, Validator: string): boolean | undefined {
    return (
      this.modelForm.get(FormControlName)?.hasError(Validator) &&
      this.modelForm.get(FormControlName)?.touched
    );
  }

  passValidator(formValue: AbstractControl): any {
    const pass1 = formValue.get('password')?.value;
    const pass2 = formValue.get('repitePassword')?.value;

    return pass1 != pass2 ? { passwordnotmatches: true } : null;
  }
}
