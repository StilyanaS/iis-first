import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { UserLogin } from './login-user.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly _initService = inject(ConnectFirebase);
  private readonly _localStorage = inject(LocalStorageService);
  @Output() registerClick = new EventEmitter<boolean>(false);
  data!: UserLogin;
  userExists = false;
  constructor(private router: Router) {}
  login(email: string, password: string) {
    this._initService.getUsers().subscribe((users) => {

      for (const user of users) {
        if (user.email === email && user.password === password && user.verified) {
          this.userExists = true;
          const userData = JSON.stringify({ ...user });
          this._localStorage.setItem('profile', userData);
          this.router.navigate(['/profile']);
        }
      }
    });
  }

  onClickRegister() {
    this.registerClick.emit(true);
  }
}
