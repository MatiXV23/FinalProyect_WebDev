import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { Credenciales } from '../types/credenciales';
import { firstValueFrom } from 'rxjs';
import { Usuario } from '../types/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient)

  private mainStore = inject(MainStore)


  async logIn(credenciales: Credenciales){
    try {
      const {token} = await firstValueFrom(this.httpClient.post<{token: string}>('http://localhost:3000/auth', credenciales))

      localStorage.setItem("token", token)

      this.mainStore.token.set(token)
      this.mainStore.user.set(await this.getUser())
    }
    catch (e) {
      throw e
    }
  }

  async logOut(){
    this.mainStore.token.set(undefined);
    this.mainStore.user.set(undefined);
    localStorage.removeItem("token")
  }

  async checkLocalStorage(){ 
    if (!this.mainStore.token() && localStorage.getItem('token')) {
      this.mainStore.token.set(localStorage.getItem('token')!)
      if (!this.mainStore.user()) this.mainStore.user.set(await this.getUser())
    }
  }

  async getUser(): Promise<Usuario>{
    return await firstValueFrom(this.httpClient.get<Usuario>('http://localhost:3000/auth'))
  }
}
