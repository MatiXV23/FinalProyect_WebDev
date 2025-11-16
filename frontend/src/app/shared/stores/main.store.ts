import { computed, HostListener, Injectable, signal } from '@angular/core';
import { Usuario } from '../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class MainStore {

  token = signal<string | undefined>(undefined)
  user = signal<Usuario | undefined>(undefined)

  isLogged = computed(()=> !!this.user())
  isAdmin = computed(()=> {
    const user = this.user()
    return !!(user && user.is_admin)
  })

  isUserLogged(id_usuario: number): boolean{ 
    return this.user()?.id_usuario === id_usuario
  }
}
