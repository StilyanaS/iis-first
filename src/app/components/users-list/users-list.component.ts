import { Component, inject, OnInit } from '@angular/core';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { UserData } from '../register/user-register.interface';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  private _initService = inject(ConnectFirebase);
  users!: Array<UserData>;
  ngOnInit(): void {
    this._initService
      .getUsers()
      .subscribe(
        (users) =>
          (this.users = users.filter(
            (user: UserData) => user.accountType !== 'admin'
          ))
      );
  }

  onFocusOut(event: FocusEvent, index: number) {
    this.updateUserData(event, index);
    this.updateUsersInDb(index);
  }

  updateUserData(event: FocusEvent, index: number) {
    const inputValue = (event.target as HTMLInputElement).value;
    const classEl = (event.target as HTMLInputElement).classList.value;
    classEl.includes('email') && (this.users[index].email = inputValue);
    classEl.includes('name') && (this.users[index].name = inputValue);
  }

  updateUsersInDb(index: number) {
    this._initService.updateUser(this.users[index]).subscribe({
      next: (user) => console.log('user up', user),
      error: (error) => console.log('err', error)
    })
  }

  modifyUser(event: Event) {
    const buttonContainer = (event.target as HTMLElement).parentElement;
    const userContainer = buttonContainer?.closest('.user');
    const userName = userContainer?.children[0] as HTMLElement;
    const userEmail = userContainer?.children[1] as HTMLElement;
    userName.removeAttribute('readonly');
    userEmail.removeAttribute('readonly');
  }
  deleteUser(index: number) {
    this._initService.deleteUser(this.users[index]).subscribe({
      next: () => console.log('user deleted'),
      error: (error) => console.error('An error ocurred', error),
    });
  }
}
