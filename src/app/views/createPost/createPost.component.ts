import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConnectFirebase } from '../../services/firebaseConnection.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createPost.component.html',
  styleUrl: './createPost.component.scss'
})
export class createPostComponent {
  private readonly _initService = inject(ConnectFirebase);

  addPost(title: string, content: string, img: string) {
    this._initService.setPost({title, content, img})
  }

  updatePost(id: string, content: string) {
    console.log('theme to add');
  }

  deletePost(id: string) {
    console.log('theme to add');
  }

}
