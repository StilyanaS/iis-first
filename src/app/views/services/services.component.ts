import { Component } from '@angular/core';
import { ServiceDetailsComponent } from '../../components/service-details/service-details.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServiceDetailsComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {}
