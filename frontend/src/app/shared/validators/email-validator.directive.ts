import { Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[emailFormat]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EmailFormatDirective), multi: true },
  ],
})
export class EmailFormatDirective implements Validator {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = (control.value ?? '').toString().trim();
    if (!value) return null;
    return this.emailRegex.test(value) ? null : { emailFormat: true };
  }
}
