import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotPanelComponent } from './slot-panel.component';

describe('SlotPanelComponent', () => {
  let component: SlotPanelComponent;
  let fixture: ComponentFixture<SlotPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
