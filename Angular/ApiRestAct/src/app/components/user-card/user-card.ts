import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user-service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-user-card',
  styleUrl: './user-card.css',
  templateUrl: './user-card.html',
})
export class UserCard {
  @Input() miUser!: IUser;
  private userService = inject(UserService);

  viewUser(arg0: IUser) {
    throw new Error('Method not implemented.');
  }
  ActualizarUser(arg0: IUser) {
    throw new Error('Method not implemented.');
  }
  deleteUser(miUser: IUser) {
    this.userService.deleteUser(miUser);
  }
}
