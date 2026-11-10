import { Service } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';

@Service()
export class UserServices {
  registrarUsuarios(user: IUser): void {
    console.log('Usuario registrado');
    console.log(user);
  }
}
