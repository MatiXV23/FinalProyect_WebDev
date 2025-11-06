import { computed, Injectable, signal } from '@angular/core';
import { Usuario } from '../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class MainStore {

  token = signal<string | undefined>(undefined)
  user = signal<Usuario | undefined>(undefined)

  isLogged = computed(()=> !!this.user())

}
