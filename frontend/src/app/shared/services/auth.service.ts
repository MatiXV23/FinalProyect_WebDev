import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { Credenciales } from '../types/credenciales';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../types/usuario';
import { baseApiURL } from '../../core/configs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);

  private mainStore = inject(MainStore);

  async logIn(credenciales: Credenciales) {
    try {
      const { token } = await firstValueFrom(
        this.httpClient.post<{ token: string }>(baseApiURL + '/auth', credenciales)
      );

      localStorage.setItem('token', token);

      this.mainStore.token.set(token);
      this.mainStore.user.set(await this.getUser());
    } catch (e) {
      throw e;
    }
  }

  async logOut() {
    this.mainStore.token.set(undefined);
    this.mainStore.user.set(undefined);
    localStorage.removeItem('token');
  }

  async checkLocalStorage() {
    if (!this.mainStore.token() && localStorage.getItem('token')) {
      this.mainStore.token.set(localStorage.getItem('token')!);
      if (!this.mainStore.user()) {
        try {
          this.mainStore.user.set(await this.getUser());
        } catch (e) {
          this.logOut();
        }
      }
    }
  }

  async getUser(): Promise<Usuario> {
    const usuarioGet = await firstValueFrom(this.httpClient.get<Usuario>(baseApiURL + '/auth'));
    this.mainStore.user.set(usuarioGet);
    return usuarioGet;
  }
}
