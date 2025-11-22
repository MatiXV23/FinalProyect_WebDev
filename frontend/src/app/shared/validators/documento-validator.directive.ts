import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appDocumentoValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DocumentoValidatorDirective,
      multi: true,
    },
  ],
})
export class DocumentoValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const esNumerico = /^\d+$/.test(value);

    if (!esNumerico) {
      return { notNumeric: true };
    }

    if (value.length !== 8) {
      return {
        invalidLength: {
          requiredLength: 8,
          actualLength: value.length,
        },
      };
    }
    return null;
  }
}
