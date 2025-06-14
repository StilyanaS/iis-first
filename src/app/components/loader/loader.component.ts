import { Component, inject } from '@angular/core';
import { LoaderService } from './loader.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService);
  // Using signal to track loading state
  // isLoading = signal(false);
  isLoading = this.loaderService.isLoading$;

}
