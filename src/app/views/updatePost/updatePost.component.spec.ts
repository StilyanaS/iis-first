import { ComponentFixture, TestBed } from '@angular/core/testing';

import { updatePostComponent } from './updatePost.component';

describe('HomeComponent', () => {
  let component: updatePostComponent;
  let fixture: ComponentFixture<updatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [updatePostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(updatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
