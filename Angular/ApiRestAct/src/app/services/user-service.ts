import { Service } from '@angular/core';
import { IUser } from '../interfaces/iuser';

@Service()
export class UserService {
  private arrUsers: IUser[];
  private url: string = 'https://peticiones.online/api/users';

  constructor() {
    this.arrUsers = [];
    this.connectProductos();
  }

  private connectProductos() {
    fetch(this.url)
      .then((response) => response.json())
      .then((datos) => {
        datos.results.forEach((element: any) => {
          let user: IUser = element as IUser;
          this.arrUsers.push(user);
        });
      });

    console.log(this.arrUsers);
    return this.arrUsers;
  }

  getAllUsers(): IUser[] {
    return this.arrUsers;
  }

  deleteUser(miUser: IUser) {
    const index = this.arrUsers.findIndex((user) => miUser.id && user.id === miUser.id);

    if (index !== -1) {
      this.arrUsers.splice(index, 1);
    }
  }
}
