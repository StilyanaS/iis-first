import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProfileActionsComponent } from '../../components/profile-actions/profile-actions.component';
import { ProfileDataComponent } from '../../components/profile-data/profile-data.component';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from '../../components/login/login-user.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileActionsComponent, ProfileDataComponent, UsersListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  private readonly localStorageService = inject(LocalStorageService);
  private profile$$ = new BehaviorSubject<UserLogin | null>(null);
  private profile$ = this.profile$$.asObservable();
  profileData?: any;
  userName: string = '';
  accountType?: string = '';
  isAdmin: boolean = false;

  ngOnInit() {
    this.getProfile();
    this.setDataInfo();
  }
  getProfile() {
    this.profileData = this.localStorageService.getItem('profile');
    this.profileData = JSON.parse(this.profileData);

  }

  setDataInfo() {
    this.userName = this.profileData.name;
    this.accountType = this.profileData.accountType;
    (this.accountType === 'admin') && (this.isAdmin = true);
    this.profile$.subscribe((data) => {
      console.log('data', data);

    })
  }
}
