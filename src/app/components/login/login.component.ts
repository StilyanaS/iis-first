import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { UserLogin } from './login-user.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AuthCheck } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit{
  private readonly _initService = inject(ConnectFirebase);
  private readonly _localStorage = inject(LocalStorageService);
  private readonly _authService = inject(AuthCheck);
  private router = inject(Router);
  @Output() registerClick = new EventEmitter<boolean>(false);
  data!: UserLogin;
  userExists = false;
  authCheck = false;
  ngOnInit(): void {
    this.authCheck = this._authService.isLoggedIn;
  }
  login(email: string, password: string) {
    this._initService.getUsers().subscribe((users) => {

      for (const user of users) {
        if (user.email === email && user.password === password && user.verified) {
          this.userExists = true;
          const userData = JSON.stringify({ ...user });
          this._localStorage.setItem('profile', userData);
          this.router.navigate(['/profile']);
          this._authService.login();
        } else {
          if (!user.verified) alert('User not verified');
          if (!(user.email === email)) alert('User not verified');
          if (!(user.password === password)) alert('User not verified');
        }
      }
    });
  }

  onClickRegister() {
    this.registerClick.emit(true);
  }
}
