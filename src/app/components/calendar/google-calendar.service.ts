// calendar-reservation.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
  private apiUrl =
    'https://us-central1-industrial-integrated-systems.cloudfunctions.net';

  constructor(private http: HttpClient) {}

  getAvailableSlots(date: string) {
    return this.http.get(
      `${this.apiUrl}/getCalendarSlots?date=${date}`
    );
  }

  reserveSlot(data: {
    name: string;
    email: string;
    dateStart: string;
    hour: string;
  }) {
    const dateTimeString = `${data.dateStart}T${data.hour}:00`;
    // "2025-07-01T10:00:00"
    const startDateTime = new Date(dateTimeString);

    if (isNaN(startDateTime.getTime())) {
      throw new Error('Received invalid date format');
    }
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000);
    const formattedData = {
      name: data.name,
      email: data.email,
      dateStart: startDateTime,
      endDateTime: endDateTime,

    }

    return this.http.post(`${this.apiUrl}/reserveSlot`, formattedData);
  }
}
