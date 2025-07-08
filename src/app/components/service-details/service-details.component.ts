import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { ServiceDetailsService } from './service-details.service';
import { ServiceDetails } from './service-details.interface';
import { LoaderService } from '../loader/loader.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-services-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-details.component.html',
  styleUrls: [
    '../../../assets/commons.scss',
    './service-details.component.scss',
  ],
})
export class ServiceDetailsComponent implements OnInit {
  imageUrls: WritableSignal<string[]> = signal([]);
  serviceDetails: WritableSignal<ServiceDetails[]> = signal([]);
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<HttpErrorResponse | null> = signal(null);
  loaderService = inject(LoaderService);

  constructor(
    private imageService: ImageService,
    private serviceDescription: ServiceDetailsService
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.getImages();
    this.getDescription();
  }

  getImages() {
    this.loading.set(true);
    this.imageService
      .getFolderImages('service-details')
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (imageUrls: unknown) => {
          this.imageUrls.set(Array.isArray(imageUrls) ? imageUrls : []);
        },
        error: (err) => {
          this.error.set(err);
        },
        complete: () => {
          this.loaderService.hide();
          console.log('Image URLs:', this.imageUrls());
        },
      });
  }

  getDescription() {
    this.serviceDescription.getServiceDetails().subscribe({
      next: (description: ServiceDetails[]) => {
        // Handle the description data as needed
        this.serviceDetails.set(description);
        console.log('short desc', this.serviceDetails()[0].short_desc);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error fetching service description:', err);
        this.error.set(err);
      },
    });
  }
}
