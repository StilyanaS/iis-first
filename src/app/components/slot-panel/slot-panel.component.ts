import { Component, EventEmitter, Input, OnInit, Output, Signal, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-slot-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-panel.component.html',
  styleUrls: ['./slot-panel.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class SlotPanelComponent {
  @Input() selectedDate!: Signal<Date | null>;
  @Output() selectedHour = new EventEmitter<string>();
  @Input() availableHours!: Signal<string[]>;
  constructor() {}


  getHour(hour: string) {
    this.selectedHour.emit(hour)
  }

}
