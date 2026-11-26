import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { IUser } from '../../interfaces/iuser';
import { UserCard } from '../../components/user-card/user-card';

@Component({
  imports: [UserCard],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class Home {
  miServicio = inject(UserService);
  arrUsers: IUser[];

  constructor() {
    this.arrUsers = [];
  }

  ngOnInit(): void {
    this.arrUsers = this.miServicio.getAllUsers();
  }

  actualizarLista() {
    this.arrUsers = this.miServicio.getAllUsers();
  }
}
