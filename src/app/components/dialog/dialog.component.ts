import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { Form } from '../form/form.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  @ViewChild('slotsDialog') slotsDialog!: ElementRef<HTMLDialogElement>;
  @Input() Date: string = '';
  @Input() Hour: string = '';
  @Input() slotCreated: boolean = false;
  @Input() loading: boolean = false;
  @Output() confirmedReservation = new EventEmitter<Form>();
  data: Form = { email: '', name: '' };
  ngAfterViewInit() {
    this.slotsDialog.nativeElement.addEventListener('close', () => {
      console.log('Dialog closed');
    });
  }
  openDialog() {
    this.slotsDialog.nativeElement.showModal();
  }

  closeDialog() {
    this.slotsDialog.nativeElement.close();
  }
  confirmReservation(data: Form) {
    console.log('Reservation confirmed with data:', data);
    this.confirmedReservation.emit(data);
  }
}
