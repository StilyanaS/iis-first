import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { ProfileActionsComponent } from '../../components/profile-actions/profile-actions.component';
import { ProfileDataComponent } from '../../components/profile-data/profile-data.component';
import { UsersListComponent } from '../../components/users-list/users-list.component';
import { BehaviorSubject } from 'rxjs';
import { UserLogin } from '../../components/login/login-user.interface';
import { UserData } from '../../components/register/user-register.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileActionsComponent, ProfileDataComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  private readonly localStorageService = inject(LocalStorageService);
  private profile$$ = new BehaviorSubject<UserLogin | null>(null);
  private profile$ = this.profile$$.asObservable();
  profileData!: UserData ;
  userName: string = '';
  accountType?: string = '';
  isAdmin: boolean = false;

  ngOnInit() {
    this.getProfile();
    this.setDataInfo();
  }
  getProfile() {
    const profile = this.localStorageService.getItem('profile');
    profile && (this.profileData = JSON.parse(profile));

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
