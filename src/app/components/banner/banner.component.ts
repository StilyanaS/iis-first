import { Component, inject } from '@angular/core';
import { BannerService } from './banner.service';
import { FormsModule } from '@angular/forms';
import { RealisticEmailValidatorDirective } from '../../directives/emailValidator.directive';
@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [FormsModule, RealisticEmailValidatorDirective],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss', '../../../assets/commons.scss'],
})
export class BannerComponent {
  loaded = false;
  imgUrl: string | null =
    'https://firebasestorage.googleapis.com/v0/b/aiscape-xs6rh.firebasestorage.app/o/robot-ind.13f306da5b059143e54b%20(2).png?alt=media&token=82bdc94c-38d1-42fb-90bd-05b43b04ea8d';
  dataSent: boolean = false;
  private readonly bannerService = inject(BannerService);
  saveContact(email: string) {
    this.bannerService.saveContant(email).subscribe({
      next: () => {
        console.log('Contact information saved successfully.');
      },
      error: (err) => {
        console.error('Error saving contact information:', err);
      },
      complete: () => {
        this.dataSent = true;
        console.log('Contact saving operation completed.');
      }
    });
  }
  onImageLoad() {
    this.loaded = true;
  }
}
