import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-user-form',
  styleUrl: './user-form.css',
  templateUrl: './user-form.html',
})
export class UserForm {
  userForm!: FormGroup<any>;
  isUpdate: boolean;

  constructor() {
    this.isUpdate = false;
    this.userForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
