import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';
import { BannerService } from './banner.service'; // Assuming BannerService is in this path

const mockBannerService = {
  saveContant: jest.fn(() => of(void 0)),
};

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;
  let bannerService: BannerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
      providers: [
        { provide: BannerService, useValue: mockBannerService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    bannerService = TestBed.inject(BannerService);
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should call saveContant on bannerService and set dataSent to true', () => {
    const email = 'test@example.com';
    component.saveContact(email);
    expect(bannerService.saveContant).toHaveBeenCalledWith(email);
    expect(component.dataSent).toBe(true);
  });

  test('should set loaded to true on onImageLoad', () => {
    component.onImageLoad();
    expect(component.loaded).toBe(true);
  });

  test('should set loaded to true and update view on image load', () => {
    const imgElement = fixture.debugElement.query(By.css('.img-banner')).nativeElement;
    imgElement.dispatchEvent(new Event('load'));

    fixture.detectChanges();

    expect(component.loaded).toBe(true);
    const placeholder = fixture.debugElement.query(By.css('.banner__placeholder'));
    expect(placeholder).toBeNull();
    const loadedImage = fixture.debugElement.query(By.css('.img-banner.loaded'));
    expect(loadedImage).not.toBeNull();
  });

  test('should call saveContact with email value on form submission', () => {
    const email = 'test@example.com';
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('.banner__subscription-input')).nativeElement;
    const form = fixture.debugElement.query(By.css('form')).nativeElement;

    emailInput.value = email;
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));

    expect(bannerService.saveContant).toHaveBeenCalledWith(email);
  });

  test('should disable the submit button when the email is invalid', () => {
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.banner__subscription-button')).nativeElement;
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('.banner__subscription-input')).nativeElement;

    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(true);
  });

  test('should enable the submit button when the email is valid', () => {
    const submitButton: HTMLButtonElement = fixture.debugElement.query(By.css('.banner__subscription-button')).nativeElement;
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('.banner__subscription-input')).nativeElement;

    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(submitButton.disabled).toBe(false);
  });

  test('should display validation error messages when the email is invalid and touched', () => {
    const emailInput: HTMLInputElement = fixture.debugElement.query(By.css('.banner__subscription-input')).nativeElement;

    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));
    emailInput.dispatchEvent(new Event('blur')); // Mark as touched
    fixture.detectChanges();

    const errorMessages = fixture.debugElement.queryAll(By.css('.error'));
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('should handle error when saveContant fails', () => {
    const error = new Error('Failed to save contact');
    mockBannerService.saveContant.mockReturnValueOnce(throwError(() => error));

    const email = 'test@example.com';
    component.saveContact(email);

    expect(bannerService.saveContant).toHaveBeenCalledWith(email);
    expect(component.dataSent).toBe(false); // dataSent should not be set to true on error
    // You might also want to check if an error message is displayed in the UI
    // or if a specific error handling method is called in the component.
  });

  test('should not render banner container when imgUrl is null', () => {
    component.imgUrl = null;
    fixture.detectChanges();

    const bannerContainer = fixture.debugElement.query(By.css('.banner-container'));
    expect(bannerContainer).toBeNull();
  });
});

