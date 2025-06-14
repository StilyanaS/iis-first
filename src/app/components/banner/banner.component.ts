import { Component, inject } from '@angular/core';
import { BannerService } from './banner.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss', '../../../assets/commons.scss']
})
export class BannerComponent {
  loaded = false;
    imgUrl =
      'https://firebasestorage.googleapis.com/v0/b/aiscape-xs6rh.firebasestorage.app/o/robot-ind.13f306da5b059143e54b%20(2).png?alt=media&token=82bdc94c-38d1-42fb-90bd-05b43b04ea8d';
  private readonly bannerService = inject(BannerService);
  saveContact() {
    this.bannerService.saveContant('email@gmail.com').subscribe({
      next: () => {
        console.log('Contact information saved successfully.');
      },
      error: (err) => {
        console.error('Error saving contact information:', err);
      }
    });
    // Logic to save contact information
    console.log('Contact information saved.');
  }
  onImageLoad() {
    this.loaded = true;
  }
}
