import { Component, inject, Input } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-profile-actions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-actions.component.html',
  styleUrl: './profile-actions.component.scss'
})
export class ProfileActionsComponent {
  private readonly _localStorageService = inject(LocalStorageService);
  @Input() isAdmin: boolean = false;
  constructor(private router: Router){}

  logout() {
    this._localStorageService.removeItem('profile');
    this.router.navigate(['/']);
  }
  modifyUsers() {
    this.router.navigate(['/users-control']);
  }
}
