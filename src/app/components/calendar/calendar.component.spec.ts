import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDatepickerInputEvent, MatDatepickerInput } from '@angular/material/datepicker';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CalendarComponent } from './calendar.component';
import { GoogleCalendarService } from './google-calendar.service';

const mockGoogleCalendarService = {
  getAvailableSlots: jest.fn(() => of({})),
  reserveSlot: jest.fn(() => of({})),
};

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let googleCalendarService: GoogleCalendarService = mockGoogleCalendarService as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CalendarComponent,
        HttpClientTestingModule
      ],
      providers: [
        { provide: GoogleCalendarService, useValue: mockGoogleCalendarService },
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    googleCalendarService = TestBed.inject(GoogleCalendarService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should update selectedDate and formattedDate on handleDate', async () => {
    const testDate = new Date(2024, 8, 15); // September 15, 2024
    const dateEvent: MatDatepickerInputEvent<Date> = { value: testDate } as any; // Use type assertion
    component.handleDate(dateEvent);

    fixture.detectChanges(); // Trigger change detection
    await fixture.whenStable(); // Wait for async operations (effects) to complete


    expect(component.selectedDate()).toEqual(testDate);
    expect(component.formattedDate).toBe('2024-09-15');
    expect(googleCalendarService.getAvailableSlots).toHaveBeenCalledWith('2024-09-15');
  });
});
