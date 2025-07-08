import { Component } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
import { ServiceSectionComponent } from '../../components/service-section/service-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, LogoCarouselComponent, ServiceSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
