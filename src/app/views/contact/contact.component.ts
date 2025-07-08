import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './contact.component.html',
  styleUrl:  './contact.component.scss',
})
export class ContactComponent {

}
