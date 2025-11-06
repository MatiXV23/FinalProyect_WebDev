import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private httpClient = inject(HttpClient);

  public async postUsuario(datos: Partial<Usuario>) {
    try {
      return await firstValueFrom(
        this.httpClient.post<Usuario[]>('http://localhost:3000/personas', { datos })
      );
    } catch (e) {
      throw e;
    }
  }
}
