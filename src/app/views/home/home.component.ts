import { Component, inject, OnInit } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { LogoCarouselComponent } from '../../components/logo-carousel/logo-carousel.component';
import { ServiceSectionComponent } from '../../components/service-section/service-section.component';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthCheck } from '../../services/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, LogoCarouselComponent, ServiceSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly checkAuth = inject(AuthCheck);
  isLogged: boolean = false;
  ngOnInit(): void {
    this.isLogged = this.checkAuth.isLoggedIn;
  }

}
