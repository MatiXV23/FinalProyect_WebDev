import { Directive, forwardRef, inject } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, ValidationErrors, AsyncValidator } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import { MainStore } from '../stores/main.store';

@Directive({
  selector: '[emailFormat]',
  standalone: true,
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => EmailFormatDirective),
      multi: true,
    },
  ],
})
export class EmailFormatDirective implements AsyncValidator {
  private mainStore = inject(MainStore);
  private userService = inject(UsuariosService);

  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  user = this.mainStore.user;

  async validate(control: AbstractControl): Promise<ValidationErrors | null> {
    const value = (control.value ?? '').toString().trim();
    if (!value) return null;

    if (!this.emailRegex.test(value)) return { emailFormat: true };

    const users = await this.userService.getUsuarios({ email: control.value });

    if (!users || users.length === 0) return null;

    if (!this.user() || users[0].id_usuario !== this.user()?.id_usuario) return { inUse: true };

    
    return null;
  }
}
