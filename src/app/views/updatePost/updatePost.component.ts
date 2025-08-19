import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';
import { ActivatedRoute } from '@angular/router';
import { updatePostService } from './updatePost.service';
import { PostService } from '../../components/single-post/single-post.interface';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatePost.component.html',
  styleUrl: './updatePost.component.scss',
})
export class updatePostComponent {
  private readonly _initService = inject(ConnectFirebase);
  private readonly route = inject(ActivatedRoute);
  private readonly updatePostService = inject(updatePostService);
  id!: string;
  postData?: any;
  updated: boolean = false;
  
  ngOnInit() {
    this.getPostData();
    this.getPostValue();
  }
  updatePost(title: string, content: string, img: string) {
    this._initService.updatePost({ id: this.id, title, content, img }).subscribe({
      next: () => this.updated = true,
      error: (err) => console.error('Error updating post:', err),
      complete: () => console.log('Update operation completed'),

    });
  }
  getPostData() {
    this.id = this.route.snapshot.params['themeId'];
  }
  getPostValue() {
    this.updatePostService.getPost(this.id).subscribe({
      next: (docSnap) => {
        this.postData = docSnap ?? undefined;
      }
    })

  }
}
