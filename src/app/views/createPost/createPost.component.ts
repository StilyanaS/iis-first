import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createPost.component.html',
  styleUrl: './createPost.component.scss',
})
export class createPostComponent {
  private readonly _initService = inject(ConnectFirebase);
  created: boolean = false;
  addPost(title: string, content: string, img: string) {
    this._initService.setPost({ title, content, img }).subscribe({
      next: () => this.created = true,
      error: (err) => console.error('Error creating post:', err),
      complete: () => console.log('Post creation completed'),
    });
  }

  updatePost(title: string, content: string, img: string) {
    this._initService.updatePost({ title, content, img });
  }

  deletePost(id: string) {
    console.log('theme to add');
  }
}
