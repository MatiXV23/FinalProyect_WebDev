import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainStore {
  token?: string
  user?: any


  getToken(){ 
    if (!this.token) { this.token = localStorage.getItem("token") ?? '' }
    return this.token
  }
}
