import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, RouterLink } from '@angular/router';
import { AuthCheck } from '../../services/authentication.service';
@Component({
  selector: 'app-profile-actions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-actions.component.html',
  styleUrl: './profile-actions.component.scss'
})
export class ProfileActionsComponent {
  private readonly _localStorageService = inject(LocalStorageService);
  private readonly _authService = inject(AuthCheck);
  @Input() isAdmin: boolean = false;

  constructor(private router: Router){}

  logout() {
    this._localStorageService.removeItem('profile');
    this.router.navigate(['/']);
    this._authService.logout();
  }
  modifyUsers() {
    this.router.navigate(['/users-control']);
  }
}
