import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsSectionService } from './single-post.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PostService } from './single-post.interface';
import { PostsService } from '../posts-section/posts-section.interface';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [],
  templateUrl: './single-post.component.html',
  styleUrls: ['../../../assets/commons.scss', './single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  posts!: PostsService[];
  post!: PostService;
  id!: string;
  private getPostsService = inject(PostsSectionService);
  private sanitizer = inject(DomSanitizer);
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.getPostId();
    this.getPost(this.id);
    this.sanitizeContent();
  }

  getPostId() {
    this.id = this.route.snapshot.params['themeId'];
    this.getPostsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.getPost(this.id);
    });
  }

  getPost(id: string) {
    if (!this.posts || !Array.isArray(this.posts)) {
      console.log('Posts not loaded yet or not an array');
      return;
    }
    for (const singlePost of this.posts) {
      singlePost.id == id && (this.post = singlePost);
    }
  }

  sanitizeContent() {
    if (!this.post) return;
    return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
  }
}
