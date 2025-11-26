import { Directive, inject, input } from '@angular/core';
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { MainStore } from '../stores/main.store';

@Directive({
  selector: '[appDocumentoValidator]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: DocumentoValidatorDirective,
      multi: true,
    },
  ],
})
export class DocumentoValidatorDirective implements Validator {
  private mainStore = inject(MainStore);
  private userService = inject(UsuariosService);

  user = input(this.mainStore.user());

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
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

    const users = await this.userService.getUsuarios({ nro_documento: control.value });

    if (!users || users.length === 0) return null;

    if (!this.user() || users[0].id_usuario !== this.user()?.id_usuario) return { inUse: true };

    return null;
  }
}
