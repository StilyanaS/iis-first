import { Component, signal } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [LoginComponent, RegisterComponent],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
   registerClicked= signal(false);
   backToLogin= signal(false);

  showForm(registerClick: boolean) {
    registerClick && (this.registerClicked.set(true));
  }
  showLogin(backClick: boolean) {
    backClick && (this.registerClicked.set(false));
  }

}
