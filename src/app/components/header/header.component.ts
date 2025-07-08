import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  menuOpen = false;
  imageUrl: WritableSignal<string | unknown> = signal('');
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<HttpErrorResponse | null> = signal(null);
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImgUrl();
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  getImgUrl() {
    this.loading.set(true);
    this.imageService.getImageUrl('IIS-logo-black.svg').subscribe({
      next: (imageUrl: unknown) => {
        console.log('imageUrl', imageUrl);

        this.imageUrl.set(imageUrl);
      },
      error: (err) => {
        this.error.set(err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
