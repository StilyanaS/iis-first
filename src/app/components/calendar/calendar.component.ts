import { Component, computed, inject, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { GoogleCalendarService } from './google-calendar.service';
import { CalendarSlots } from './calendar.interface';
import { effect } from '@angular/core';
import { LoaderService } from '../loader/loader.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Form } from '../form/form.interface';
import { SlotPanelComponent } from '../slot-panel/slot-panel.component';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    DialogComponent,
    SlotPanelComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [GoogleCalendarService, LoaderService, SlotPanelComponent],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  @ViewChild(DialogComponent) slotsDialog!: DialogComponent;
  selectedDate = signal<Date | null>(null);
  formattedDate = '';
  events = signal<[{}]>([{}]);
  mindate = new Date();
  slotsData = signal<CalendarSlots>({ busy: [] });
  busyHours = signal<string[]>([]);
  slotsLoaded = signal<boolean>(false);
  loaderService = inject(LoaderService);
  selectedHour = signal('');
  slotCreated = signal<boolean>(false);
  isLoading: boolean = false;
  constructor(private calendarService: GoogleCalendarService) {
    effect(() => {
      const date = this.selectedDate();
      if (date) {
        this.formattedDate = this.formatDateLocal(date);
        this.getSlots();
      }
    });
  }
  ngOnInit(): void {}

  handleDate(event: MatDatepickerInputEvent<Date>) {
    console.log('this event', event);

    this.selectedDate.set(event.value);
  }

  availableHours = computed(() => {
    const date = this.selectedDate();
    if (!date) return [];
    console.log(this.busyHours);

    const hours: string[] = [];
    for (let h = 9; h < 17; h++) {
      hours.push(`${h.toString().padStart(2, '0')}:00`);
      hours.push(`${h.toString().padStart(2, '0')}:30`);
    }

    const busy = this.busyHours();

    return hours.filter((h) => !busy.includes(h));
  });

  reserveSlot(hour: string): void {
    const date = this.selectedDate();
    if (!date) return;
    this.selectedHour.set(hour);
    this.slotsDialog.openDialog();
    //this.getSlots();
  }

  requestSlot(data: Form) {
    this.isLoading = true;
    if (!data) {
      console.error('Form data is undefined');
      return;
    }
    console.log('Requesting slot with data:', data);

    this.calendarService
      .reserveSlot({
        name: data.name ?? '',
        email: data.email ?? '',
        dateStart: this.formattedDate,
        hour: this.selectedHour(),
      })
      .subscribe({
        next: (res) => {
          console.log('Slot reserved successfully:', res);
          this.slotCreated.set(true);
          this.getSlots(); // Refresh the slots after reservation
        },
        error: (err) => console.error('Error reserving the slot', err),
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  getSlots() {
    this.loaderService.show();
    console.log('formatted date', this.formattedDate);

    if (this.formattedDate)
      this.calendarService.getAvailableSlots(this.formattedDate).subscribe({
        next: (data) => {
          this.slotsData.set(data);
          this.formatHours();
        },
        error: (err) => {
          console.error('Error getting calendar slots:', err);
        },
        complete: () => {
          this.loaderService.hide();
        },
      });
  }

  formatHours() {
    const busySlots = this.slotsData()?.busy || [];
    const formatted = busySlots.map((slot: {end: string, start: string}) => {

      const start = new Date(slot.start);
      return start.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Madrid',
      });
    });
    this.busyHours.set(formatted);
    console.log('busy hours', this.busyHours());
  }

  formatDateLocal(date: Date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // meses 0-11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
