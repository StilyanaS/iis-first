import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsSectionService } from './single-post.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-single-post',
  standalone: true,
  imports: [],
  templateUrl: './single-post.component.html',
  styleUrls: ['../../../assets/commons.scss', './single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  posts!: PostsSectionService[];
  post!: any;
  singlePost!: any;
  id!: string;
  private getPostsService = inject(PostsSectionService);
  private sanitizer = inject(DomSanitizer);
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.gePostId();
    this.getPost(this.id);
    this.sanitizeContent();
  }

  gePostId() {
    this.id = this.route.snapshot.params['themeId'];
    this.getPostsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.getPost(this.id);
    });
  }

  getPost(id: string) {
    this.post = this.posts;
    for (this.singlePost of this.posts) {
      (this.singlePost.id == id) && (this.post = this.singlePost);
    }
  }

  sanitizeContent() {
    return this.sanitizer.bypassSecurityTrustHtml(this.post.content);
  }
}
