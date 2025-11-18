import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../types/usuario';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment'; 
import { Resenia } from '../types/resenia';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private httpClient = inject(HttpClient);

  public async getUserById(id_usuario: string): Promise<Usuario> {
    try {
      return await firstValueFrom(
        this.httpClient.get<Usuario>(`${environment.apiUrl}/usuarios/${id_usuario}`)
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
        this.httpClient.post<Usuario[]>(environment.apiUrl+'/usuarios', datos)
      );
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
  public async getUsuarios() {
    const users = await firstValueFrom(
      this.httpClient.get<Usuario[]>(environment.apiUrl+'/usuarios')
    );
    return users;
  }

  public async eliminarUsuario(id: number) {
    await firstValueFrom(this.httpClient.delete(`${environment.apiUrl}/usuarios/${id}`));
  }

  public async updateUsuario(datos: Partial<Usuario>): Promise<void> {
    try {
      await firstValueFrom(this.httpClient.put(`${environment.apiUrl}/usuarios/${datos.id_usuario}`, datos))
      
    } catch (e: any) {
      console.log('Este es el error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
  
  public async updateUserPwd(id_usuario:number, password: string): Promise<void> {
    try {
      await firstValueFrom(this.httpClient.put(`${environment.apiUrl}/usuarios/${id_usuario}/pwd`, {password: password}))
      
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }


  // RESENIAS
  public async getUserResenias(id_usuario:string): Promise<Resenia[]>{
    try {
      return await firstValueFrom(this.httpClient.get<Resenia[]>(`${environment.apiUrl}/usuarios/${id_usuario}/resenias`,))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  // CARRITO
  public async updateCarrito(id_usuario: number, articulos_carrito: number[]): Promise<void> {
    try {
      await firstValueFrom(this.httpClient.patch(`${environment.apiUrl}/usuarios/${id_usuario}`,{articulos_carrito}))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }

  async comprarArticulo(id_usuario:number, id_articulo: number){
    try {
      await firstValueFrom(this.httpClient.post(`${environment.apiUrl}/usuarios/${id_usuario}/compras`, {id_articulo}))
    } catch (e: any) {
      console.log('Error: ' + e.error.message);
      if (e.status === 0) throw new Error(e.message);
      throw new Error(e.error.message);
    }
  }
}
