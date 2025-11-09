import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { firstValueFrom } from 'rxjs';
import { baseApiURL } from '../../core/configs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private httpClient = inject(HttpClient);

  public async getUserById(id_usuario: string): Promise<Usuario> {
    try {
      return await firstValueFrom(
        this.httpClient.get<Usuario>(`${baseApiURL}/usuarios/${id_usuario}`)
      );
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async postUsuario(datos: Partial<Usuario>): Promise<Usuario[]> {
    try {
      console.log('postUsuarios try: \n');
      return await firstValueFrom(
        this.httpClient.post<Usuario[]>(baseApiURL+'/usuarios', datos)
      );
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
  public async getUsuarios() {
    const users = await firstValueFrom(
      this.httpClient.get<Usuario[]>(baseApiURL+'/usuarios')
    );
    return users;
  }

  public async eliminarUsuario(id: number) {
    await firstValueFrom(this.httpClient.delete(`${baseApiURL}/usuarios/${id}`));
  }

  public async updateUsuario(datos: Partial<Usuario>): Promise<void> {
    try {
      await firstValueFrom(this.httpClient.put(`${baseApiURL}/usuarios/${datos.id_usuario}`, datos))
      
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  public async updateUserPwd(id_usuario:number, password: string): Promise<void> {
    try {
      console.log(id_usuario, password)
      console.log('updateuserPwd try: \n');
      await firstValueFrom(this.httpClient.put(`${baseApiURL}/usuarios/${id_usuario}/pwd`, {password: password}))
      
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
}
