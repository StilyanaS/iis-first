import { Component, inject } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
import { ServiceSectionComponent } from '../../components/service-section/service-section.component';
import { PostsComponent } from '../posts/posts.component';
import { SinglePostComponent } from '../../components/single-post/single-post.component';
import { AuthCheck } from '../../services/auth-check.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, LogoCarouselComponent, ServiceSectionComponent, SinglePostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
