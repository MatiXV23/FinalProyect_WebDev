import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { MainStore } from '../stores/main.store';
import { Credenciales } from '../types/credenciales';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient)

  private mainStore = inject(MainStore)

  private User: any = null


  isLogged = signal<boolean>(false)


  async logIn(credenciales: Credenciales){
    try {
      const {token} = await firstValueFrom(this.httpClient.post<{token: string}>('http://localhost:3000/auth', credenciales))
      console.log("token: ", token)
      this.mainStore.token = token
      this.isLogged.set(true)
      localStorage.setItem("token", token)
    }
    catch (e) {
      throw e
    }
  }

  async logOut(){
    this.isLogged.set(false)
    console.log("log out")
    this.mainStore.token = undefined;
    localStorage.removeItem("token")
  }

  async getUser(){
    if (!this.User) { this.User = await firstValueFrom(this.httpClient.get('http://localhost:3000/auth')) }

    return this.User
  }
}
