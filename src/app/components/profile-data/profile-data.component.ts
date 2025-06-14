import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  standalone: true,
  imports: [],
  templateUrl: './profile-data.component.html',
  styleUrl: './profile-data.component.scss'
})
export class ProfileDataComponent {
  @Input() userName ?: string = '';
  @Input() accountType ?: string ;

}
