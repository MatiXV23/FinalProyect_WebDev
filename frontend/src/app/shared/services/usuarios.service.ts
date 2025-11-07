import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private httpClient = inject(HttpClient);

  public async postUsuario(datos: Partial<Usuario>): Promise<Usuario[]> {
    try {
      console.log('postUsuarios try: \n');
      return await firstValueFrom(
        this.httpClient.post<Usuario[]>('http://localhost:3000/usuarios', datos)
      );
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
}
