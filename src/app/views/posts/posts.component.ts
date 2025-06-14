import { Component, inject, OnInit } from '@angular/core';
import { PostsSectionComponent } from '../../components/posts-section/posts-section.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostsSectionComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {


}
