import { Component, inject, Input, OnChanges, OnInit, signal, WritableSignal } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { RouterModule } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthCheck } from '../../services/authentication.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnChanges {
  menuOpen = false;
  imageUrl: WritableSignal<string | unknown> = signal('');
  loading: WritableSignal<boolean> = signal(true);
  error: WritableSignal<HttpErrorResponse | null> = signal(null);
  private authCheck = inject(AuthCheck);
  isLogged = this.authCheck.loggedInSignal;
  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.getImgUrl();
    this.checkAuth();
    console.log('header ngOnInit called');

  }
  ngOnChanges(): void {
    this.checkAuth();
    console.log('ngOnChanges called');
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
  checkAuth() {
    console.log('Header check');

    console.log('isLogged:', this.isLogged());

  }
}
