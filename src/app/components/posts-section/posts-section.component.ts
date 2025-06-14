import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from './posts-section.interface';
import { PostsSectionService } from './posts-section.service';
import { RouterModule } from '@angular/router';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-posts-section',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './posts-section.component.html',
  styleUrls: ['../../../assets/commons.scss', './posts-section.component.scss'],
})
export class PostsSectionComponent implements OnInit {
  posts: PostsService[] = [];
  private getPostsService = inject(PostsSectionService);
  private readonly loaderService = inject(LoaderService);
  ngOnInit(): void {
    this.getPostsService.getPosts().subscribe({
      next: (posts) => {
      this.posts = posts;
      },
      complete: () => {
        this.loaderService.hide();
      }
    });
  }

  postClick(index: any) {

  }
}
