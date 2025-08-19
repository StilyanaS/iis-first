import { Directive } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Directive({
  selector: '[realisticEmail]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RealisticEmailValidatorDirective,
      multi: true,
    },
  ],
})
export class RealisticEmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Require at least one dot after the @
    return value && /^[^@]+@[^@]+\.[^@]+$/.test(value)
      ? null
      : { realisticEmail: true };
  }
}
