import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from './posts-section.interface';
import { PostsSectionService } from './posts-section.service';
import { Router, RouterLink } from '@angular/router';
import { LoaderService } from '../loader/loader.service';
import { CommonModule } from '@angular/common';
import { AuthCheck } from '../../services/authentication.service';

@Component({
  selector: 'app-posts-section',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './posts-section.component.html',
  styleUrls: ['../../../assets/commons.scss', './posts-section.component.scss'],
})
export class PostsSectionComponent implements OnInit {
  posts: PostsService[] = [];
  postDeleted: boolean = false;
  authCheck = false;
  private getPostsService = inject(PostsSectionService);
  private readonly loaderService = inject(LoaderService);
  private readonly auth = inject(AuthCheck);
  private readonly router = inject(Router);
  ngOnInit(): void {
    this.getPosts();
    this.authCheck = this.auth.isLoggedIn;
  }

  getPosts() {
    this.getPostsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      complete: () => {
        this.loaderService.hide();
      },
    });
  }

  viewPost(id: string | undefined) {
    console.log('Viewing post with ID:', id);
    this.router.navigate(['/posts', id]);
  }
  editPost(id: string | undefined) {
    this.router.navigate(['/updatePost', id]);
  }
  deletePost(id: string | undefined) {
    if (id == null) return
    console.log('post delete');

    this.getPostsService.deletePost(id).subscribe({
      next: () => {
        console.log('Post deleted');
      },
      error: (err) => {
        console.error('Error saving contact information:', err);
      },
      complete: () => {
        this.postDeleted = true;
      }
    })
  }
}
