import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { UserData } from './user-register.interface';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly _initService = inject(ConnectFirebase);
  @Output() backClicked = new EventEmitter<boolean>(false);
  data!: UserData;
  success!: boolean;
  formSent!: boolean;
  register(email: string, password: string, name: string) {
    this.data = {
      accountType: 'author',
      email: email,
      name: name,
      password: password,
    };
    this._initService.createUser(this.data).subscribe({
      next: () => { this.success = true;},
      error: () => {
        this.success = false;
      },
    });
    this.formSent = true;
  }

  onClickBack() {
    this.backClicked.emit(true);
  }
}
