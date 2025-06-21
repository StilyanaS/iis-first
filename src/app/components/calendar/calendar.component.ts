import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CalendarEvent,
  CalendarModule,
  CalendarView,
  CalendarMonthViewComponent,
} from 'angular-calendar';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, CalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  view = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate = new Date();

  // ✅ Signal reactivo para la fecha seleccionada
  selectedDate = signal<Date | null>(null);

  // ✅ Signal con los eventos (ej: reservas ya hechas)
  events = signal<CalendarEvent[]>([
    {
      start: startOfDay(new Date(2025, 5, 20)),
      title: 'Slot reservado',
      color: { primary: '#ad2121', secondary: '#FAE3E3' },
    },
  ]);

  // ✅ Computed signal para las horas disponibles (reactivo)
  availableHours = computed(() => {
    const date = this.selectedDate();
    if (!date) return [];
    const hours: string[] = [];
    for (let h = 9; h <= 17; h++) {
      hours.push(`${h}:00`);
    }
    return hours;
  });

  // ✅ Al hacer clic en un día del calendario
  handleDayClick(date: Date): void {
    this.selectedDate.set(date);
  }

  // ✅ Simulación de reserva (se podría extender a un backend)
  reserveSlot(hour: string): void {
    const date = this.selectedDate();
    if (!date) return;

    const title = `Reservado a las ${hour}`;
    const [h, min] = hour.split(':').map(Number);

    this.events.update((current) => [
      ...current,
      {
        start: new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          h,
          min
        ),
        title,
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      },
    ]);

    alert(`Slot reservado: ${date.toDateString()} a las ${hour}`);
  }
}
