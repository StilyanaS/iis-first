import { Component, OnInit, computed } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  menuOpen = false;
  constructor(private imageService: ImageService) {}

  toggleMenu() {}
}
