import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { PostsComponent } from './views/posts/posts.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { createPostComponent } from './views/createPost/createPost.component';
import { UserAuthComponent } from './views/user-auth/user-auth.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ErrorComponent } from './views/error/error.component';
import { AuthGuard } from './guards/user.guard';
import { ServicesComponent } from './views/services/services.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: HomeComponent  },
  { path: 'services', component: ServicesComponent },
  { path: 'createPost', component: createPostComponent },
  { path: 'authentication', component: UserAuthComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'users-control', component: UsersListComponent },
  {
    path: 'posts',
    children: [
      { path: '', component: PostsComponent },
      {
        path: ':themeId',
        component: SinglePostComponent,
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];
